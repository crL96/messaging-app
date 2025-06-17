const prisma = require("../config/prisma");

async function createChat(req, res) {
    try {
        const chat = await prisma.chat.create({
            data: {
                users: {
                    connect: [
                        { id: req.user.id },
                        { username: req.body.invUser },
                    ],
                },
            },
        });
        console.log("Chat created with id: " + chat.id);
        res.status(200).json({ chatId: chat.id });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

async function getChat(req, res) {
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.chatId,
            },
            include: {
                messages: {
                    select: {
                        id: true,
                        text: true,
                        timestamp: true,
                        sender: {
                            select: { username: true },
                        },
                    },
                },
                users: {
                    select: {
                        username: true,
                        imgUrl: true,
                    }
                }
            },
        });

        res.json({
            chatId: chat.id,
            messages: chat.messages,
            currentUser: req.user.username,
            users: chat.users,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

async function getAllChatsUser(req, res) {
    try {
        const chats = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                chats: {
                    include: {
                        users: {
                            where: { // Exclude users own name from list
                                id: { not: req.user.id },
                            },
                            select: {
                                username: true,
                                imgUrl: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(chats);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

async function sendMessage(req, res) {
    try {
        if (req.body === undefined || req.body.text === undefined) {
            res.status(400).send(
                "Bad request: include message text as 'text' in body"
            );
            return;
        }

        await prisma.message.create({
            data: {
                senderId: req.user.id,
                chatId: req.params.chatId,
                text: req.body.text,
            },
        });
        res.status(200).send("Message sent");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function addUserToChat(req, res) {
    try {
        if (!req.body || !req.body.username) {
            res.status(400).send("Bad request: Include username in body");
            return;
        }

        //Check if user exists
        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: req.body.username,
                    mode: "insensitive",
                }
            },
        });
        if (user === null) {
            res.status(404).send("No user found");
            return;
        }
        // if user exists, add to chat (users already in chat will have no effect)
        const chat = await prisma.chat.update({
            where: {
                id: req.params.chatId,
            },
            data: {
                users: {
                    connect: [
                        { username: user.username },
                    ],
                },
            },
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createChat,
    getChat,
    sendMessage,
    getAllChatsUser,
    addUserToChat,
};
