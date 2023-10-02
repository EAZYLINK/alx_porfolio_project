import { useRef, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";
import NavBar from "../components/NavBar";


function DashboardPage() {
    const navItems = [
        { name: "Home", link: "/" },
        { name: "Logout", link: "/login" },
    ];

    const chatroomNameRef = useRef();
    const navigate = useNavigate();
    const [chatrooms, setChatrooms] = useState([]);
    const [userId, setUserId] = useState("");

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

    const createChatroom = async () => {
        await axios.post("http://localhost:8000/api/chatrooms", {
            name: chatroomNameRef.current.value,
            userId
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
        })
        .then((response) => {
            console.log(response);
            if (response && response.data && response.data.chatroom ) {
                const newChatrooms = [...chatrooms, response.data.chatroom];
                setChatrooms(newChatrooms);
                makeToast("success", response.data.message);
            } else if(response.status === 401) {
                navigate("/login");
            } else {
                makeToast("error", response.data.message);
            }
        })
        .catch((error) => {
            console.log(error.message);
            makeToast("error", 'you are not authorized');
            navigate("/login");
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            navigate("/login");
            makeToast("error", 'you are not authorized');
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
        getChatrooms();
        // eslint-disable-next-line
    }, []);

    return (
        <>
        <NavBar navItems={navItems} />
        <div className="card align-items-center m-5">
        <div className="card-header bg-transparent text-primary fs-1 fw-bold border-0">Chat Room</div>
        <div className="card-body mx-5 mt-3">
            <div className="input-group mb-3">
            <label htmlFor="name" className="input-group-text">Chatroom Name</label>
            <input type="text" name="name" id="name" ref={chatroomNameRef} className="form-control" placeholder="Enter chatroom name" required/>
            </div>
            <button className="btn btn-primary" type="button" onClick={createChatroom}>Create Chatroom</button>
        </div>
        <div className="card">
            {chatrooms.map((chatroom) => (
                <div className="input-group mb-3">
                <div key={chatroom._id} className="input-group-text">
                <div className="form-control mx-3">{chatroom.name}</div>
                <Link to={"/chatroom/" + chatroom._id}>
                <div className="form-control">Join</div>
                </Link>
                </div> 
                </div>
            ))}
        </div>
    </div>
    </> 
    );
    }

export default DashboardPage;