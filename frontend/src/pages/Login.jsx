import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

const API_URL = import.meta.env.VITE_API_URL;

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
                navigate("/");
            } else {
                setDisplayMsg(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            {displayMsg ? <p>Incorrect email and or password</p> : null}
            <form onSubmit={handleLogin}>
                <legend>Log In</legend>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" />
                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export default Login;
