import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
 const [isvisible,setIsvisible] = useState(true);
  const [newdata, setNewdata] = useState({
    email: '',
    password: '',
  });
  const { email, password } = newdata;
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const changeHandler = (e) => {
    setNewdata({ ...newdata, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' }); // Clear field-specific error when typing
    setError('')
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    // Proceed with login request if no errors
    axios.post("http://localhost:5000/login", newdata)
      .then(res => {
        if (res.data.success) {
          alert("Login successfully");
          navigate("/");
        } else {
          setError(res.data.message || "Invalid email or password");
        }
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data.message || 'An error occurred. Please try again later.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      });

    setNewdata({
      email: '',
      password: ''
    });
  };
 const closelogin = ()=>{
  setIsvisible(false);
 }
 if (!isvisible) return null;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='box1'>
             <button onClick={closelogin} className="close-btn">X</button>
          <h2>Login</h2>
          <div className='mail1'>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Enter Email'
              onChange={changeHandler}
              style={{ borderColor: fieldErrors.email ? 'red' : '' }}
            />
            {fieldErrors.email && <p style={{ color: "red" }}>{fieldErrors.email}</p>}
          </div>

          <div className='password5'>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Enter Password'
              onChange={changeHandler}
              style={{ borderColor: fieldErrors.password ? 'red' : '' }}
            />
            {fieldErrors.password && <p style={{ color: "red" }}>{fieldErrors.password}</p>}
            <Link to = "/forgotpassword" className="password">Forgot Password</Link>
          </div>

          <div className='submit1'>
            <button className="btn">Login</button>
          </div> <br />

          <p>Don't have an account? <Link to="/signup" className="register-link">Register</Link></p>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;