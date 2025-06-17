import "./App.css";
import Header from "./components/header/Header";
import ChatList from "./components/chatList/ChatList";
import ActiveChat from "./components/activeChat/ActiveChat";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function App() {
    const [activeChat, setActiveChat] = useState(null);
    const navigate = useNavigate();

    // Free tier publish for backend shuts down after inactivity,
    // navigate user to dedicated loading page if server isnt running
    useEffect(() => {
        fetch(`${API_URL}/`)
            .then(res => {
                if (res.status !== 200) {
                    console.log("Backend server not running yet, booting up")
                    navigate("/server-starting")
                }
            })
            .catch(() => {
                console.log("Backend server not running yet, booting up")
                navigate("/server-starting")
            })
    }, [navigate]);

    return (
        <div className="app">
            <Header />
            <main>
                <ChatList setActiveChat={setActiveChat} activeChat={activeChat}/>
                <ActiveChat chatId={activeChat} />
            </main>
        </div>
    );
}

export default App;
