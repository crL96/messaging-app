const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");

const app = express();

//App Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Server running");
});
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));