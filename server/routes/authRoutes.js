const express = require("express")
const { authValidator } = require("../validations/authValidator")
const authController = require("../controllers/authController")
const authRouter = express.Router()

authRouter.post("/register", authValidator, authController.register)
authRouter.post("/login", authValidator, authController.login)

module.exports = authRouter