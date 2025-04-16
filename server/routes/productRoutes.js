const express = require("express")
const productController = require("../controllers/productController")
const checkProductExists = require("../middlewares/ceckProductExists")
const productRouter = express.Router()

productRouter.get("/", productController.getProducts)
productRouter.get("/:productId", checkProductExists, productController.getProductById)

module.exports = productRouter