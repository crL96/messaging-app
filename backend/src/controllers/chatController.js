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

module.exports = {
    createChat,
};
