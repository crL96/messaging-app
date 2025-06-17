import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import ChatMessage from "./chatMessage";
import MessageBox from "../messageBox/MessageBox";
import ChatHeader from "./ChatHeader";
import "./activeChat.css";

function ActiveChat({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function getChatData() {
            if (chatId === null) return;

            try {
                const res = await fetch(`${API_URL}/chat/messages/${chatId}/`, {
                    headers: {
                        authorization: localStorage.getItem("jwt-token"),
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data.messages);
                    setCurrentUser(data.currentUser);
                    setUsers(data.users.filter(user => user.username !== data.currentUser));
                } else if (res.status === 401) {
                    navigate("/login");
                    localStorage.removeItem("jwt-token");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getChatData();
    }, [chatId, navigate]);

    useEffect(() => {
        // Scroll to bottom by default and on new message
        const messageContainer = document.querySelector("#messagesContainer");
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    })

    return (
        <div className="activeChat">
            <ChatHeader users={users} chatId={chatId} setUsers={setUsers} />
            <div id="messagesContainer">
                {messages.map((message) => {
                    return (
                        <ChatMessage key={message.id} message={message} currentUser={currentUser}/>
                    );
                })}
            </div>
            <MessageBox chatId={chatId} updateMessageList={setMessages}/>
        </div>
    );
}

export default ActiveChat;
