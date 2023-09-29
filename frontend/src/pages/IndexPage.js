import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


const IndexPage = (props) => {

    return (
        <><NavBar /><div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-danger">
                    Index Page
                </div>
            </div>
        </div></>
    // const navigate = useNavigate();
    // React.useEffect(() => {
    //     // eslint-disable-next-line
    //     const token = localStorage.getItem("CC_Token");
    //     if (!token) {
    //         navigate("/login");
    //     }
    //     else {
    //         navigate("/dashboard");
    //     }
    // }, [props, navigate]);
    );
};


export default IndexPage;