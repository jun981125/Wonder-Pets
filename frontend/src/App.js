// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopMember from "./components/member/member";
import Home from "./components/main";
import LoginPage from "./components/member/LoginPage";
import LoginForm from "./components/chat/login";
import ChatRoomList from "./components/chat/ChatRoom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loginPage" element={<LoginPage />}/>
                <Route path="/registerPage" element={<RegisterPage />}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
