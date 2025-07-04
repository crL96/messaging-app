import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import styles from "./forms.module.css";

const API_URL = import.meta.env.VITE_API_URL;
const GUEST_EMAIL = import.meta.env.VITE_GUEST_EMAIL;
const GUEST_PW = import.meta.env.VITE_GUEST_PW;

function Login() {
    const [displayMsg, setDisplayMsg] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        try {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch(`${API_URL}/auth/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                setDisplayMsg(false);
                const resPayload = await res.json();
                localStorage.setItem("jwt-token", resPayload.token);
                navigate("/chat");
            } else {
                setDisplayMsg(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function handleGuestLogin() {
        try {
            const res = await fetch(`${API_URL}/auth/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    email: GUEST_EMAIL,
                    password: GUEST_PW,
                }),
            });
            if (res.status === 200) {
                setDisplayMsg(false);
                const resPayload = await res.json();
                localStorage.setItem("jwt-token", resPayload.token);
                navigate("/chat");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            {displayMsg ? <p className={styles.errorMessage}>Incorrect email and/or password</p> : null}
            <form className={styles.form} onSubmit={handleLogin}>
                <legend>Log In</legend>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Log in</button>
            </form>
            <button
                type="button"
                className={styles.guestBtn}
                onClick={handleGuestLogin}
            >
                Log in as guest
            </button>
        </>
    );
}

export default Login;
