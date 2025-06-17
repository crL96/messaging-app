import "./App.css";
import Header from "./components/header/Header";
import ChatList from "./components/chatList/ChatList";
import ActiveChat from "./components/activeChat/ActiveChat";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [activeChat, setActiveChat] = useState(null);

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
