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

    return (
        <><NavBar navItems={navItems}/>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-danger">
                    Index Page
                </div>
            </div>
        </div></>
    );
};


export default HomePage;