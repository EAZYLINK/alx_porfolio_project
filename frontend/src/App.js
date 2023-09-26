import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import IndexPage from './pages/IndexPage';
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
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chatroom/:id" element={<ChatroomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
