const router = require("express").Router();
const controller = require("../controllers/chatController");
const passport = require("../config/passport");
const authMiddleware = require("../middleware/auth");

router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    controller.createChat
);

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    controller.getAllChatsUser
);

router.get(
    "/messages/:chatId",
    passport.authenticate("jwt", { session: false }),
    authMiddleware.verifyChatAuth,
    controller.getChat
);
router.post(
    "/messages/:chatId",
    passport.authenticate("jwt", { session: false }),
    authMiddleware.verifyChatAuth,
    controller.sendMessage
);

module.exports = router;
