const ProductModel = require("../models/Product.model");

const productController = {
  async getProducts(req, res) {
    try {
      const products = await ProductModel.find().populate("brand")
      res.status(200).json({ products })
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Не удалось получить товары!" })
    }
  }
}

module.exports = productController