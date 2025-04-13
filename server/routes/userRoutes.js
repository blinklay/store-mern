const express = require("express")
const userController = require("../controllers/userController")
const checkAuth = require("../middlewares/authCheck.middleware")
const userRouter = express.Router()

userRouter.get("/me", checkAuth, userController.getSelf)
userRouter.post("/logout", userController.logout)
userRouter.post("/cart", checkAuth, userController.addToCart)
userRouter.post("/favorites", checkAuth, userController.addToFavorites)
userRouter.delete("/favorites/:productId", checkAuth, userController.removeFromFavorites)
module.exports = userRouter