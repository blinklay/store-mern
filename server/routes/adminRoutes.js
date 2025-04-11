const express = require("express")
const checkAuth = require("../middlewares/authCheck.middleware")
const adminController = require("../controllers/adminController")
const checkRole = require("../middlewares/roleCheck.middleware")
const adminRouter = express.Router()

adminRouter.get("/users", checkAuth, checkRole("admin"), adminController.getUsers)

module.exports = adminRouter