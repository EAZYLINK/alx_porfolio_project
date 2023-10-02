import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ChatroomPage from './pages/ChatroomPage';
import io from "socket.io-client";
import makeToast from './Toaster';

function App() {
  const [socket, setSocket] = React.useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });
      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });
      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    // eslint-disable-next-line
  }, []);
  
  return (
      <Routes>
        <Route path="/" Component={HomePage} exact/>
        <Route path="/login" Component ={(props)=><LoginPage {...props} setupSocket={setupSocket} />} />
        <Route path="/register" Component={RegisterPage} exact/>
        <Route path="/dashboard" Component={()=><DashboardPage socket={socket} />} />
        <Route path="/chatroom/:id" Component={()=><ChatroomPage socket={socket}/>} />
      </Routes>
  );
}

export default App;
