const prisma = require("../config/prisma");

async function verifyChatAuth(req, res, next) {
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.chatId,
            },
            include: {
                users: true,
            },
        });
        if (chat === null) {
            res.status(404).send("Non valid chatId");
            return;
        }
        // If current user isnt a member of the chat, deny
        if (!chat.users.some((user) => user.id === req.user.id)) {
            res.status(403).send("Forbidden");
            return;
        }
        // User authorized
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    verifyChatAuth,
}