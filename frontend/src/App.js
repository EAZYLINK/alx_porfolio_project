import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import IndexPage from './pages/IndexPage';
import ChatroomPage from './pages/ChatroomPage';


function App() {
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
