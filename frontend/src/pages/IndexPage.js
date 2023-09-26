import React from "react";
import { useNavigate } from "react-router-dom";


const IndexPage = (props) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        // eslint-disable-next-line
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            navigate("/login");
        }
        else {
            navigate("/dashboard");
        }
    }, [props, navigate]);
};


export default IndexPage;