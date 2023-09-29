import React from "react";
import axios from 'axios';
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate();
    console.log(props);
    const login = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8000/api/auth/login', {
            username,
            password
        }
        )
        .then((response) => {
            console.log(response);
            makeToast("success", response.data.message);
            localStorage.setItem("CC_Token", response.data.token);
            navigate('/dashboard');
        }, (error) => {
            if (error && error.response && error.response.data && error.response.data.message)
            makeToast("error", error.response.data.message)
        });
    }
    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Enter Username" required ref={usernameRef}/>
                </div>
                <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" required ref={passwordRef}/>
                </div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
    }

export default LoginPage;