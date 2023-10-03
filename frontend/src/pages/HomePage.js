import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


const HomePage = () => {
    const navItems = [
        {
            name: "Login",
            link: "/login",
        },
        {
            name: "Register",
            link: "/register",
        },
        {
            name: "Dashboard",
            link: "/dashboard",
        }
    ];

    const navigate = useNavigate()

    const register = () =>{
        navigate('/register')
    }

    return (
        <><NavBar navItems={navItems}/>
        <div className="container text-center mt-5">
      <h1>Welcome to ChatApp</h1>
      <p>A Real-Time Chat Application</p>
      <button className="btn btn-primary" onClick={register}>Get Started</button>
    </div>
    </>
    );
};


export default HomePage;