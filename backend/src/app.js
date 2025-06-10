const express = require("express");
const cors = require("cors");

const app = express();

//App Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));