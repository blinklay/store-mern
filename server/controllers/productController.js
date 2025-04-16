const handleError = require("../helpers/handleErrors");
const ProductModel = require("../models/Product.model");

const productController = {
  async getProducts(req, res) {
    try {
      const products = await ProductModel.find().populate("brand")
      res.status(200).json({ products })
    } catch (e) {
      handleError(res, e, "Не удалось получить товары!")
    }
  },
  async getProductById(req, res) {
    try {
      const { _id: productId } = req.product
      const product = await ProductModel.findById(productId).populate("brand")

      return res.status(200).json({
        product
      })
    } catch (e) {
      handleError(res, e, "Не удалось получить товар!")
    }
  }
}

module.exports = productController