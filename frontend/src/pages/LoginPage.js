import React from "react";
import axios from 'axios';
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function LoginPage(props) {
    const navItems = [
        {
            name: "Register",
            link: "/register",
        }
    ];
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate();
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
            props.setupSocket();
            navigate('/dashboard');
        }).catch((error) => {
            if (error && 
                error.response && 
                error.response.data 
                && error.response.data.message)
            makeToast("error", error.response.data.message)
        });
    }
    return (
        <><NavBar navItems={navItems} />
        <div className="card m-5 align-items-center">
            <div className="card-header border-0 text-primary fs-1 fw-bold text-center bg-transparent">LOGIN</div>
            <div className="card-body mx-5 mt-5 border-1"> 
                <div className="input-group mb-3"> 
                    <label htmlFor="username" className="input-group-text">Username</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="Enter Username" required ref={usernameRef} />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="password" className="input-group-text">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" required ref={passwordRef} />
                </div>
                <button onClick={login} className="btn btn-primary m-3" type="button">Login</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div></>
    );
    }

export default LoginPage;