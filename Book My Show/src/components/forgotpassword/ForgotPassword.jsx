import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when typing
    setSuccess(""); // Clear success message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your Email address");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/checkemail?email=${email}`);
      if (response.data.success) {
        setSuccess("Instructions for resetting your password have been sent to your email.");
        setError(""); // Clear any errors
      } else {
        setError(response.data.message || "Email is not registered.");
        setSuccess(""); // Clear any success messages
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
      setSuccess(""); // Clear success message
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleChange}
            className={error ? "input-error" : ""}
          />
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <button type="submit" className="submit-button">
            Submit
          </button>
          <p>
            Back to <Link to="/login" className="submit-login">Login</Link>
          </p>
          <p>
            <Link to="/Newpassword" className="new">Create New Password</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
