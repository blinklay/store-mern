const express = require("express")
const checkAuth = require("../middlewares/authCheck.middleware")
const adminController = require("../controllers/adminController")
const checkRole = require("../middlewares/roleCheck.middleware")
const productValidator = require("../validations/productValidator")
const handleValidationError = require("../middlewares/handleValidationErrors")
const adminRouter = express.Router()

adminRouter.get("/users", checkAuth, checkRole("admin"), adminController.getUsers)
adminRouter.post("/product", checkAuth, checkRole("admin"), productValidator, handleValidationError, adminController.addProduct)
adminRouter.post("/role/add", checkAuth, checkRole("admin"), adminController.addUserRole)

module.exports = adminRouter