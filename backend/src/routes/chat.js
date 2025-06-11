const router = require("express").Router();
const controller = require("../controllers/chatController");
const passport = require("../config/passport");

router.post(
    "/new",
    passport.authenticate("jwt", { session: false }),
    controller.createChat
);

module.exports = router;
