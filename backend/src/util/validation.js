const { body, validationResult } = require("express-validator");
const prisma = require("../config/prisma");

const validateUser = [
    body("username")
        .notEmpty().withMessage("Username cannot be empty")
        .trim()
        .isString().withMessage("Username has to be of type string")
        .isAlphanumeric("en-US", {ignore: " "})
        .withMessage("Username must be alpha-numeric (only numbers and letters")
        .isLength({ min: 1, max: 25 })
        .withMessage("Username must be between 1 and 25 characters")
        //Check if username is already in use
        .custom(async (value) => {
            const user = await prisma.user.findFirst({
                where: {
                    username: {
                        equals: value,
                        mode: "insensitive",
                    }
                },
            });
            if (user) throw new Error("Username is already in use");
        })
        .withMessage("Username is already in use"),

    body("email")
        .notEmpty().withMessage("Email cannot be empty")
        .isString().withMessage("Email has to be of type string")
        .trim()
        .isEmail()
        .withMessage("Email must be in a valid email format")
        .isLength({ min: 1, max: 50 })
        .withMessage("Username must be between 1 and 50 characters")
        //Check if email is already in use
        .custom(async (value) => {
            const user = await prisma.user.findUnique({
                where: { email: value },
            });
            if (user) throw new Error("Email is already in use");
        })
        .withMessage("Email is already in use"),

    body("password")
        .notEmpty().withMessage("Password cannot be empty")
        .isString().withMessage("Password has to be of type string")
        .trim()
        .isLength({ min: 1, max: 25 })
        .withMessage("Password must be between 1 and 25 characters"),

    body("confPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Confirm password and password must match"),
];

const validateImgUrl = [
    body("imgUrl")
        .notEmpty().withMessage("Url cannot be empty")
        .isString().withMessage("Url has to be of type string")
        .trim()
        .custom((value) => {
            const urlEnd = value.split(".").pop();
            if (
                urlEnd === "jpg" ||
                urlEnd === "png" ||
                urlEnd === "svg" ||
                urlEnd === "jpeg" ||
                urlEnd === "webp"
            ) {
                return true;
            }
            return false;
        })
        .withMessage(
            "Url must reference an image with jpg, png, svg, jpeg or webp format"
        ),
];

module.exports = {
    validationResult,
    validateUser,
    validateImgUrl,
}