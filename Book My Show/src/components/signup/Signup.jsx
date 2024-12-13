import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const [data, setData] = useState({
        fullname: '',
        mobilenumber: '',
        email: '',
        password: '',
        confirmpwd: ''
    });

    const [errormessage, setErrorMessage] = useState(''); // State for success/error message
    const [ successmessage,setSuccessMessage] = useState('')
    const { fullname, mobilenumber, email, password, confirmpwd } = data;

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if password and confirm password match
        if (password !== confirmpwd) {
           setErrorMessage('Passwords do not match!');
            return;
        }

        // Send POST request to register the user
        axios.post("http://localhost:5000/register", data)
            .then(res => {
                setSuccessMessage('Successfully Registered!'); // Success message
                setData({
                    fullname: '',
                    mobilenumber: '',
                    email: '',
                    password: '',
                    confirmpwd: ''
                });
            })
            .catch(err => {
                setErrorMessage('Registration failed. Please try again!'); // Error message
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='box'>
                <h1 id ="h1">Sign up</h1>
                <div className='name'>
                    <input
                        type='text'
                        name='fullname'
                        value={fullname}
                        required
                        placeholder='Enter Full Name'
                        onChange={changeHandler}
                    />
                    <br />
                </div>
                <div className='number'>
                    <input
                        type='number'
                        name='mobilenumber'
                        value={mobilenumber}
                        required
                        placeholder='Enter mobile number'
                        onChange={changeHandler}
                    />
                    <br />
                </div>
                <div className='mail'>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        required
                        placeholder='Enter Email'
                        onChange={changeHandler}
                    />
                    <br />
                </div>
                <div className='password1'>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        required
                        placeholder='Enter Password'
                        onChange={changeHandler}
                    />
                    <br />
                </div>
                <div className='password2'>
                    <input
                        type='password'
                        name='confirmpwd'
                        value={confirmpwd}
                        required
                        placeholder='Confirm Password'
                        onChange={changeHandler}
                    />
                    <br />
                </div>
                <div className='submit'>
                    <button id="register">Register</button>
                </div>
                <br />
                {errormessage && <p className="errormessage">{errormessage}</p>} {/* Display the message */}
                {successmessage && <p className="successmessage">{successmessage}</p>}
                <p>Back to <Link to="/login" className='log'>login</Link></p>
            </div>
        </form>
    );
};

export default Signup;