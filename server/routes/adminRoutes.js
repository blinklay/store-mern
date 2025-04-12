const express = require("express")
const checkAuth = require("../middlewares/authCheck.middleware")
const adminController = require("../controllers/adminController")
const checkRole = require("../middlewares/roleCheck.middleware")
const productValidator = require("../validations/productValidator")
const adminRouter = express.Router()

adminRouter.get("/users", checkAuth, checkRole("admin"), adminController.getUsers)
adminRouter.post("/product", checkAuth, checkRole("admin"), productValidator, adminController.addProduct)

module.exports = adminRouter