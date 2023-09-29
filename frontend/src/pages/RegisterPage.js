import React from "react";
import axios from 'axios';
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {
    const navigate = useNavigate();
    const usernameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = () => {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8000/api/users/register', {
            username,
            email,
            password
        })
        .then((response) => {
            console.log(response);
            makeToast("success", response.data.message);
            navigate('/login');
        }, (error) => {
            console.log(error);
            makeToast("error", error.response.data.message)
        });
    }

    return (
        <div className="card">
        <div className="cardHeader">Registration</div>
        <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Enter Username" ref={usernameRef} required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="example@email.com" ref={emailRef} required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" ref={passwordRef} required />
            </div>
            <button onClick={registerUser}>Login</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </div>
    );
    }

export default RegisterPage;