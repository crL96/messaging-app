import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import ChatMessage from "./chatMessage";
import MessageBox from "../messageBox/MessageBox";

function ActiveChat({ chatId }) {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getMessages() {
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
                } else if (res.status === 401) {
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [chatId, navigate]);

    return (
        <div>
            <div>
                {messages.map((message) => {
                    return (
                        <ChatMessage key={message.id} message={message} />
                    );
                })}
            </div>
            <MessageBox chatId={chatId} updateMessageList={setMessages}/>
        </div>
    );
}

export default ActiveChat;
