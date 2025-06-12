import { useState } from "react";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import ChatPreview from "./ChatPreview";
import NewChat from "../newChat/NewChat";
import { useNavigate } from "react-router-dom";

function ChatList({ setActiveChat }) {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getChats() {
            try {
                const res = await fetch(`${API_URL}/chat`, {
                    headers: {
                        authorization: localStorage.getItem("jwt-token"),
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    setChats(data.chats);
                } else if (res.status === 401) {
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getChats();
    }, [navigate]);

    return (
        <div>
            <div>
                {chats.map((chat) => {
                    return (
                        <ChatPreview
                            key={chat.id}
                            chat={chat}
                            setActiveChat={setActiveChat}
                        />
                    );
                })}
            </div>
            <NewChat setActiveChat={setActiveChat} setChatList={setChats} />
        </div>
    );
}

export default ChatList;
