const router = require("express").Router();
const controller = require("../controllers/userController");
const passport = require("../config/passport");

router.get(
    "/:username",
    passport.authenticate("jwt", { session: false }),
    controller.findUser
);

router.post(
    "/profile-img",
    passport.authenticate("jwt", { session: false }),
    controller.setProfileImg
);

module.exports = router;
