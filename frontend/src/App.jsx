import "./App.css";
import Header from "./components/header/Header";
import ChatList from "./components/chatList/ChatList";
import ActiveChat from "./components/activeChat/ActiveChat";
import { useState } from "react";

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
