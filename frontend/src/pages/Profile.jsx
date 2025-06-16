import { useEffect, useState } from "react";
import Header from "../components/header/Header";
const API_URL = import.meta.env.VITE_API_URL;
import userIcon from "../assets/user-icon-medium.png";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    async function fetchData() {
            const res = await fetch(`${API_URL}/user`, {
                headers: {
                    authorization: localStorage.getItem("jwt-token"),
                },
            });
            if (res.status === 200) {
                const user = await res.json();
                setUser(user);
            }
        }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleImgSubmit(e) {
        try {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch(`${API_URL}/user/profile-img`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    authorization: localStorage.getItem("jwt-token"),
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                fetchData();
                setShowDialog(false);
                setErrorMessages([]);
                e.target.reset();
            } else if (res.status === 401) {
                navigate("/login");
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
            <h2>Profile</h2>
            {user ? (
                <>
                    <ul>
                        {errorMessages.map((error, index) => {
                            return <li key={index}>{error.msg}</li>;
                        })}
                    </ul>
                    <div className="profileContainer">
                        <img
                            src={user.imgUrl ? user.imgUrl : userIcon}
                            alt="User icon"
                        />
                        <p>
                            Username: <strong>{user.username}</strong>
                        </p>
                        <p>
                            Email: <strong>{user.email}</strong>
                        </p>
                        <button onClick={() => setShowDialog(true)}>
                            Update Profile Picture
                        </button>
                    </div>
                    <dialog open={showDialog}>
                        <form onSubmit={handleImgSubmit}>
                            <label htmlFor="imgUrl">Image URL/link: </label>
                            <input type="text" name="imgUrl" id="imgUrl" />
                            <div>
                                <button type="submit">Submit</button>
                                <button
                                    type="button"
                                    onClick={() => setShowDialog(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </dialog>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Profile;
