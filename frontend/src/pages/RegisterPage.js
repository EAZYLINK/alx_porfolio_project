import React from "react";
import axios from 'axios';
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function RegisterPage(props) {
    const navItems = [
        {
            name: "Login",
            link: "/login",
        }
    ];
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
        <><NavBar navItems={navItems} />
        <div className="card m-5 align-items-center">
            <div className="card-header text-center border-0 bg-transparent text-primary fs-1 fw-bold">REGISTERATION</div>
            <div className="card-body mx-5 mt-5 border-1"> 
                <div className="input-group mb-3">
                    <label htmlFor="username" className="input-group-text" >Username</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="Enter Username" ref={usernameRef} required />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="email" className="input-group-text">Email</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="example@email.com" ref={emailRef} required />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="password" className="input-group-text">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" ref={passwordRef} required />
                </div>
                <button onClick={registerUser} className="btn btn-primary m-3">Register</button>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div></>
    );
    }

export default RegisterPage;