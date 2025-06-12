import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    async function handleSignup(e) {
        try {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch(`${API_URL}/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(data),
            });
            // If sucessful, attempt to login user
            if (res.status === 200) {
                const loginRes = await fetch(`${API_URL}/auth/log-in`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                });
                if (loginRes.status === 200) {
                    const resPayload = await loginRes.json();
                    localStorage.setItem("jwt-token", resPayload.token);
                    navigate("/");
                } else {
                    navigate("/login");
                }
            // If unsuccessful display validation error messages
            } else if (res.status === 400) {
                const payload = await res.json();
                setErrorMessages(payload.errors);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <ul>
                {errorMessages.map((error, index) => {
                    return <li key={index}>{error.msg}</li>;
                })}
            </ul>
            <form onSubmit={handleSignup}>
                <legend>Sign Up</legend>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" />
                <label htmlFor="confPassword">Confirm Password: </label>
                <input type="password" name="confPassword" id="confPassword" />
                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export default Signup;
