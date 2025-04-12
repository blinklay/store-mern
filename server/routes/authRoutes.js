const express = require("express")
const { authValidator } = require("../validations/authValidator")
const authController = require("../controllers/authController")
const handleValidationError = require("../middlewares/handleValidationErrors")
const authRouter = express.Router()

authRouter.post("/register", authValidator, handleValidationError, authController.register)
authRouter.post("/login", authValidator, handleValidationError, authController.login)

module.exports = authRouter