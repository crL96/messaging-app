import "./App.css";
import Header from "./components/header/Header";
import ChatList from "./components/chatList/ChatList";
import ActiveChat from "./components/activeChat/ActiveChat";
import { useState } from "react";

function App() {
    const [activeChat, setActiveChat] = useState(null);

    return (
        <>
            <Header />
            <ChatList setActiveChat={setActiveChat}/>
            <ActiveChat chatId={activeChat} />
        </>
    );
}

export default App;
