import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import styles from "./messageBox.module.css";
import { useNavigate } from "react-router-dom";

function MessageBox({ chatId, updateMessageList }) {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/chat/messages/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: localStorage.getItem("jwt-token"),
                },
                body: JSON.stringify({
                    text: message,
                }),
            });
            if (res.status === 200) {
                setMessage("");
                refreshMessages();
            } else if (res.status === 401) {
                navigate("/login");
                localStorage.removeItem("jwt-token");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshMessages() {
        try {
            const res = await fetch(`${API_URL}/chat/messages/${chatId}/`, {
                headers: {
                    authorization: localStorage.getItem("jwt-token"),
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                updateMessageList(data.messages);
            } else if (res.status === 401) {
                navigate("/login");
                localStorage.removeItem("jwt-token");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    id="text"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default MessageBox;
