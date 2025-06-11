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
                        text: true,
                        timestamp: true,
                        sender: {
                            select: { username: true },
                        },
                    },
                },
                users: true,
            },
        });
        if (chat == null) {
            res.status(404).send("Non valid chatId");
            return;
        }
        // If current user isnt a member of the chat, deny
        if (!chat.users.some((user) => user.id === req.user.id)) {
            res.status(403).send("Forbidden");
            return;
        }
        res.json({
            chatId: chat.id,
            messages: chat.messages,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createChat,
    getChat,
};
