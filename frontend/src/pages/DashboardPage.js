import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";


function DashboardPage() {
    const navigate = useNavigate();
    const [chatrooms, setChatrooms] = React.useState([]);
    const getChatrooms = async () => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
        navigate("/login");
    }
     await   axios.get("http://localhost:8000/api/chatrooms", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
        })
        .then((response) => {
            console.log(response);
            if (response && response.data && response.data.chatrooms ) {
                setChatrooms(response.data.chatrooms);
            } else if(response.status === 401) {
                navigate("/login");
            } else {
                setChatrooms([]);
            }
        })
        .catch((error) => {
            console.log(error.message);
            makeToast("error", 'you are not authorized');
            navigate("/login");
        });
    }

    React.useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="card">
        <div className="cardHeader">Chat Room</div>
        <div className="cardBody">
            <div className="inputGroup">
            <label htmlFor="name">Chatroom Name</label>
            <input type="text" name="name" id="name" placeholder="Enter chatroom name" required/>
            </div>
            <button >Create Chatroom</button>
        </div>
        <div className="chatrooms">
            {chatrooms.map((chatroom) => (
                <div key={chatroom._id} className="chatroom">
                <div>{chatroom.name}</div>
                <Link to={"/chatroom/" + chatroom._id}>
                <div className="join">Join</div>
                </Link>
                </div> 
            ))}
        </div>
    </div>
    );
    }

export default DashboardPage;