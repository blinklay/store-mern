const express = require("express")
const userController = require("../controllers/userController")
const checkAuth = require("../middlewares/authCheck.middleware")
const checkProductExists = require("../middlewares/ceckProductExists")
const userRouter = express.Router()

userRouter.get("/me", checkAuth, userController.getSelf)
userRouter.post("/logout", userController.logout)
userRouter.post("/cart/:productId", checkAuth, checkProductExists, userController.addToCart)
userRouter.post("/favorites/:productId", checkAuth, checkProductExists, userController.addToFavorites)
userRouter.delete("/favorites/:productId", checkAuth, checkProductExists, userController.removeFromFavorites)
userRouter.delete("/cart/:productId", checkAuth, checkProductExists, userController.removeFromCart)
module.exports = userRouter