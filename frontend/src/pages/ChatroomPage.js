import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ChatroomPage({socket}) {
    const { id} = useParams();
    const [messages, setMessages] = React.useState([]);
    const [chatroom, setChatroom] = React.useState("");
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");

    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId: id,
                message: messageRef.current.value,
            });
            messageRef.current.value = "";
           
        } else {
            console.log("Socket not Connected");
        }
    }

    const checkKey = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
    
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                const newMessages = [...messages, message];
                setMessages(newMessages);
            });
        }
        // eslint-disable-next-line
    }, [messages]);

    React.useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId: id,
            });
        }
        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId: id,
                });
            }
        }
        // eslint-disable-next-line
    }, []);

   
    const getChatroom = async () => {

        };

     React.useEffect( () => {
            if (socket) {
            try {
                const token = localStorage.getItem("CC_Token");
                if (token) {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    setUserId(payload.id);
                }
                const response =  axios.get(`http://localhost:8000/api/chatrooms/${id}`,
                {headers: {
                         "Authorization": "Bearer " + localStorage.getItem("CC_Token"),
                }}
                );
                setChatroom(response.data.chatroom.name);
            } catch (error) {
                setTimeout(getChatroom, 3000);
            }
            }
        // eslint-disable-next-line
    }, [id]);


    return (
        
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">
                    { chatroom  }
                </div>
                <div className="chatroomContent">
                    {messages.map((message, i) => (
                        <><div key={i} className={userId === message.userId ? "me" : "others"}>
                            <div
                                className={userId === message.userId ? "ownMessage" : "otherMessage"}
                            >{userId === message.userId ? "You" : message.name}</div>
                            {message.data.message}
                        </div>
                        <p>{message.data.createdAt}</p></>
                    ))}
                </div>
                <div className="chatroomActions">
                    <div>
                        <input
                         type="text" 
                         name="message" 
                         placeholder="Say something!" 
                         ref={messageRef} onKeyUp={checkKey}/>
                    </div>
                    <div>
                        <button onClick={sendMessage} >Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default ChatroomPage;