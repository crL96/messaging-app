const router = require("express").Router();
const controller = require("../controllers/chatController");
const passport = require("../config/passport");

router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    controller.createChat
);

router.get(
    "/messages/:chatId",
    passport.authenticate("jwt", { session: false }),
    controller.getChat
);

module.exports = router;
