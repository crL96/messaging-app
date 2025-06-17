import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import styles from "./addUserToChat.module.css";

function AddUserToChat({ chatId, setUsers }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [showMsg, setShowMessage] = useState(false);
    const navigate = useNavigate();

    if (!open) {
        return (
            <button className={styles.openBtn} onClick={() => setOpen(true)}>
                Add User
            </button>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/chat/users/${chatId}`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("jwt-token"),
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    username: value,
                }),
            });
            if (res.status === 200) {
                setOpen(false);
                setShowMessage(false);
                setValue("");
                // window.location.reload();
                refreshUsers();
            } else if (res.status === 404) {
                setShowMessage(true);
                return;
            } else if (res.status === 401) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshUsers() {
        if (chatId === null) return;
        try {
            const res = await fetch(`${API_URL}/chat/messages/${chatId}/`, {
                headers: {
                    authorization: localStorage.getItem("jwt-token"),
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                setUsers(
                    data.users.filter(
                        (user) => user.username !== data.currentUser
                    )
                );
            } else if (res.status === 401) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            {showMsg ? <p>No user found</p> : null}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Add</button>
                <button type="button" onClick={() => setOpen(false)}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AddUserToChat;
