const prisma = require("../config/prisma");

async function findUser(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.params.username,
            },
        });
        if (user === null) {
            res.status(404).send("No user found");
            return;
        }
        res.json({
            username: user.username,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    findUser,
};
