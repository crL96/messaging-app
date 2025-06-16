const prisma = require("../config/prisma");
const { validateImgUrl, validationResult } = require("../util/validation");

async function findUser(req, res) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: req.params.username,
                    mode: "insensitive",
                }
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

const setProfileImg = [
    validateImgUrl,

    async (req, res) => {
        //Check if validation passed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        try {
            const user = await prisma.user.update({
                where: {
                    id: req.user.id,
                },
                data: {
                    imgUrl: req.body.imgUrl,
                }
            })
            if (user) {
                res.sendStatus(200);
            } else {
                res.status(400).send("Include URL to profile image in body as 'imgUrl'");
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal server error");
        }
    }
];

module.exports = {
    findUser,
    setProfileImg,
};
