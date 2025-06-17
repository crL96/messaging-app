import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ServerStarting from "./pages/ServerStarting";

const routes = [
    {
        path: "/",
        element: <ServerStarting />,
    },
    {
        path: "chat",
        element: <App />
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <Signup />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
];

export default routes;
