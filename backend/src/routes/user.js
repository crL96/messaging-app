const router = require("express").Router();
const controller = require("../controllers/userController");
const passport = require("../config/passport");

router.get(
    "/:username",
    passport.authenticate("jwt", { session: false }),
    controller.findUser
);

module.exports = router;
