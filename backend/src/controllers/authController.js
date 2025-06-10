const prisma = require("../config/prisma");
const brycpt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
    try {
        //Check if email is in use
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (existingEmail) {
            res.status(409).send("Email is already in use");
            return;
        }
        //Check if username is in use
        const existingUsername = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        if (existingUsername) {
            res.status(409).send("Username is already in use");
            return;
        }

        const hashedPw = await brycpt.hash(req.body.password, 10);

        await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPw,
                email: req.body.email,
            },
        });
        res.status(200).send("User created");
    } catch (err) {
        if (
            err.message.startsWith("\nInvalid `prisma.user.create") ||
            err.message.startsWith("Cannot read properties of undefined") ||
            err.message.startsWith("Illegal arguments: undefined")
        ) {
            res.status(400).send(
                "Bad request: include username, email and password"
            );
            return;
        }
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createUser,
};
