import { useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import makeToast from "../Toaster";
import NavBar from "../components/NavBar";

function ChatroomPage({socket}) {
    const navItems = [
        { name: "Home", link: "/" },
        { name: "Chatrooms", link: "/chatrooms" },
        { name: "Logout", link: "/login" },
    ];

    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [chatroom, setChatroom] = useState("");
    const messageRef = useRef();
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([])

    const sendMessage = async() => {
        if (socket) {
            await axios.post('https://chat-app-api-5thl.onrender.com/api/messages', {
                chatroomId: id,
                message: messageRef.current.value,
                userId: userId
            },
            {headers: {Authorization: `Bearer ${localStorage.getItem("CC_Token")}`}}
            ).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error);
            });
            socket.emit("chatroomMessage", {
                chatroomId: id,
                message: messageRef.current.value,
                username
            });
            messageRef.current.value = "";
           
        } else {
            console.log("Socket not Connected");
        }
    }


    const getChatroom = async () => {
        await axios.get(`https://chat-app-api-5thl.onrender.com/api/chatrooms/${id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("CC_Token")}`}}
        ).then((response) => {
            setChatroom(response.data.chatroom.name);
        }).catch((error) => {
            if (error.status === 404) {
                setChatroom("");
            } else if(error.status === 401) {
                localStorage.removeItem("CC_Token");
                makeToast("error", "Session Expired");
            } else {
                console.log(error);

            }
        });
    }

 


    const checkKey = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }

        const getUsers = async () => {
            try {
                const response = await axios.get('https://chat-app-api-5thl.onrender.com/api/users',
                {headers: {Authorization: `Bearer ${token}`}}
                )
                setUsers(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        const getChatroomMessages = async () => {
            await axios.get(`https://chat-app-api-5thl.onrender.com/api/messages/chatroom/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
            ).then((response) => {
                setMessages([...response.data.data]);
            }).catch((error) => {
                console.log(error);
            });
        }

        if (socket) {
        socket.on("newMessage", () => {
            console.log("new message sent")
            getChatroomMessages()
        });
        }

        getChatroomMessages()
        getChatroom();
        getUsers();
        // eslint-disable-next-line
    }, [id, messages, socket])

    useEffect(() => {
        axios.get(`https://chat-app-api-5thl.onrender.com/api/users/${userId}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("CC_Token")}`}}
        )
        .then((response)=>{
            setUsername(response.data.data.username)
        }).catch((error)=>{
            console.log(error.message)
        })
    }, [userId])

    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId: id,
                chatroom,
                username
            });
            makeToast("info", `You have joined ${chatroom}`)
        }
        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId: id,
                    chatroom,
                    username
                });
                makeToast("info", `${username} have left ${chatroom}`)
            };

            if (socket) {
                socket.on('/logout', () => {
                    localStorage.removeItem("CC_Token");
                    makeToast("info", "Logout Successful");
                });
            }
        }
        // eslint-disable-next-line
    }, [id, chatroom, username, socket]);


    return (
        <><NavBar navItems={navItems} />
        <div className="container">
            <div className="card mt-5 px-2 border-4">
                <div className="card-header bg-transparent text-primary text-center fs-1 fw-bold">
                    {chatroom}
                </div>
                <div className="card-body " style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    {messages.map((message, i) => (
                        <>
                            <div className="row">
                                <div key={i} className={userId !== message.user ? 'card text-end mb-2 col-7 border-0' : 'card text-end mb-2 col-7 border-0'}></div>
                                <div key={i} className={userId === message.user ? 'card rounded bg-primary text-end text-white mb-2 col-5 border-0 round-2' : 'card text-start mb-2 col-5 me-5 bg-light'}
                                >
                                    <div className="card-header border-0 mb-1 fst-italic">
                                        {userId === message.user ? "You" : users[users.findIndex(obj => obj._id === message.user)]?.username}
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text fs-5 fw-medium">{message.message}</div>
                                        <p className="card-text fs-6 fst-italic">{message.createdAt.split('.')[0].replace(/-/g, '/').replace('T', ' ')}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="card-footer row border-0">
                    <div className="input-group mb-3 mx-lg-3">
                        <input
                            type="text"
                            name="message"
                            placeholder="Say something!"
                            ref={messageRef} onKeyUp={checkKey} 
                            className="form-control"
                            aria-describedby="send-btn"
                            />
                        <div className="input-group-append">
                            <button onClick={sendMessage} className="btn btn-outline-secondary " type="button" id="send-btn">send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
    }

export default ChatroomPage;