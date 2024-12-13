const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const os = require("os");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const server = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsha',
});

function getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === "IPv4" && !address.internal) {
                return address.address; // Return the first non-internal IPv4 address
            }
        }
    }
    return "127.0.0.1"; // Fallback to localhost if no address is found
}

server.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/register', (req, res) => {
    const { fullname, mobilenumber, email, password, confirmpwd } = req.body;

    const query = 'INSERT INTO users (fullname, mobilenumber, email, password, confirmpwd) VALUES (?, ?, ?, ?, ?)';

    server.query(query, [fullname, mobilenumber, email, password, confirmpwd], (error, result) => {
        if (error) {
            console.error("Error inserting data into database:", error);
            return res.status(500).json({ message: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    server.query(query, [email], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
            const user = result[0];
            if (user.password === password) {
                return res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }
    });
});

const sendMail = async (to, mailOptions) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.zeptomail.in',
        port: 587,
        auth: {
            user: "emailapikey",
            pass: 'PHtE6r1eROHrjG968hhW7fbuF8LwZoMqru1nfgRG4YxKAqAFSU1QotAjxGfj/hl+VaQWE/aby91ouOmbu+PXJWq+MTlPCGqyqK3sx/VYSPOZsbq6x00cuFgZckHYUYbnc9Bq3CDVud3YNA=='
        }
    });

    const options = {
        to: to,
        from: 'noreply@ramanasoft.in',
        ...mailOptions
    };

    try {
        await transport.sendMail(options);
        console.log("Email sent successfully");
        return { status: 200, message: 'Email sent successfully' };
    } catch (err) {
        console.error("Error in mail sending:", err);
        return { status: 500, message: 'Error in mail sending' };
    }
};

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    server.query(query, [email], async (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
            const text = `Reset your password using this link: http://${getLocalIp()}:5173/Newpassword`;
            const subject = "Reset Password || RamanaSoft Consulting Services";

            const response = await sendMail(email, { subject, text });
            return res.status(response.status).json({ message: response.message });
        } else {
            return res.status(404).json({ message: 'Email not registered' });
        }
    });
});

app.get("/checkemail", (req, res) => {
    const sql = "SELECT password FROM users WHERE email = ?";
    const email = req.query.email;

    server.query(sql, [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result.length > 0) {
            const text = `Reset your password using this link: http://${getLocalIp()}:5173/Newpassword`;
            const subject = "Reset Password || RamanaSoft Consulting Services";

            const response = await sendMail(email, { subject, text });
            if (response.status === 200) {
                console.log("Reset email sent");
                return res.status(200).json({ message: "Email sent successfully" });
            } else {
                return res.status(500).json({ message: "Error sending email" });
            }
        } else {
            return res.status(404).json({ message: "Email not exists" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
