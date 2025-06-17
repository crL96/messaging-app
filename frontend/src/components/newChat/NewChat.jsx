import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import styles from "./newChat.module.css";

function NewChat({ setActiveChat, setChatList }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [showMsg, setShowMessage] = useState(false);
    const navigate = useNavigate();

    if (!open) {
        return <button className={styles.openBtn} onClick={() => setOpen(true)}>New Chat</button>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Check if valid username
            const user = await fetch(`${API_URL}/user/username/${value}`, {
                headers: {
                    Authorization: localStorage.getItem("jwt-token"),
                },
            });
            if (user.status === 404) {
                setShowMessage(true);
                return;
            } else if (user.status !== 200) {
                console.log(user.status);
            } else if (user.status === 401) {
                navigate("/login");
                localStorage.removeItem("jwt-token");
            }
            // Username is valid, create chat
            const res = await fetch(`${API_URL}/chat/new`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("jwt-token"),
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    invUser: (await user.json()).username, //use reponse instead of value for case sens
                }),
            });
            if (res.status === 200) {
                const data = await res.json();
                setActiveChat(data.chatId);
                refreshChatList();
                setOpen(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshChatList() {
        try {
            const res = await fetch(`${API_URL}/chat`, {
                headers: {
                    authorization: localStorage.getItem("jwt-token"),
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                setChatList(data.chats);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            {showMsg ? <p>Couldn't find user with that username</p> : null}
            <form onSubmit={handleSubmit}>
                <legend>Start new chat</legend>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Create chat</button>
                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            </form>
        </div>
    );
}

export default NewChat;
