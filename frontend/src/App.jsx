import "./App.css";
import { Link } from "react-router-dom";
import ChatList from "./components/chatList/ChatList";
import { useState } from "react";

function App() {
    const [activeChat, setActiveChat] = useState(null);

    return (
        <>
            <h1>Hello world</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <div>
                <ChatList setActiveChat={setActiveChat}/>
            </div>
        </>
    );
}

export default App;
