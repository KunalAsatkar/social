import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const Login = () => {

    const [showlogin, setShowLogin] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        fname: "",
        lname: "",
        email: "",
        contactno: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(false)
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const loginHandler = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/login', data)
            .then((response) => {
                // console.log(response.data.token);
                // console.log(response.data.data);
                localStorage.setItem('username', response.data.data.username);
                localStorage.setItem('jwt_token', response.data.token);
                navigate('/wellcome');
            })
            .catch(function (err) {
                setErrorMessage(true);
                console.log(err);
            });

    }
    const registerHandler = async (e) => {
        e.preventDefault();
        // console.log(data);
        axios.post('http://localhost:5000/auth/register', data)
            .then((response) => {
                // console.log(response);
                setShowLogin(!showlogin);
                navigate('/')
            })
            .catch(function (err) {
                setErrorMessage(!errorMessage);
                // setTimeout(() => {
                //     setErrorMessage(true);
                // }, 300)
                console.log(err);
            });

    }
    return (

        <div className="auth">
            {showlogin && (
                <div className="auth-container">
                    <h2>Login</h2>
                    <form className="login">
                        <label htmlFor="email">email</label>
                        <input value={data.email} onChange={changeHandler} type="email" name="email" id="email" placeholder="email" />
                        <label htmlFor="password">password</label>
                        <input value={data.password} onChange={changeHandler} type="password" name="password" id="password" placeholder="******" />
                        <button onClick={loginHandler} type="submit">Log In</button>
                    </form>
                    <p>Don't have account <span onClick={() => { setShowLogin(false); }}>RegisterHere</span> </p>
                    {errorMessage &&
                        (<p className="error-message">The entered credentials are incorrect</p>)
                    }
                </div>
            )}
            {!showlogin && (
                <div className="auth-container">
                    <h2>Register</h2>
                    <form className="register">
                        <label htmlFor="username">username</label>
                        <input value={data.username} onChange={changeHandler} type="username" name="username" id="username" placeholder="username" />
                        <label htmlFor="fname">First Name</label>
                        <input value={data.fname} onChange={changeHandler} type="fname" name="fname" id="fname" placeholder="first name" />
                        <label htmlFor="lname">Last Name</label>
                        <input value={data.lname} onChange={changeHandler} type="lname" name="lname" id="lname" placeholder="last name" />
                        <label htmlFor="email">email</label>
                        <input value={data.email} onChange={changeHandler} type="email" name="email" id="email" placeholder="email" />
                        <label htmlFor="contactno">contact Number</label>
                        <input value={data.contactno} onChange={changeHandler} type="contactno" name="contactno" id="contactno" placeholder="first name" />
                        <label htmlFor="password">password</label>
                        <input value={data.password} onChange={changeHandler} type="password" name="password" id="password" placeholder="******" />
                        <button onClick={registerHandler} type="submit">Register</button>
                    </form>
                    <p>Already have an account? <span onClick={() => { setShowLogin(true); }}>LoginHere</span> </p>
                    {errorMessage &&
                        (<p className="error-message">All the details is required</p>)
                    }
                </div>
            )}
        </div>

    )
}

export default Login;