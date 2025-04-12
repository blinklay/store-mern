const UserModel = require("../models/User.model");
const BrandModel = require("../models/Brand.model");
const ProductModel = require("../models/Product.model");

const adminController = {
  async getUsers(_, res) {
    try {
      const users = await UserModel.find()
      res.status(200).json({ users })
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Не удалось получить список пользователей!" })
    }
  },
  async addProduct(req, res) {
    try {
      const { title, description, price, sale, count, imageUrl, brandObj } = req.body

      let product = await ProductModel.findOne({ title })
      if (product) {
        return res.status(400).json({ message: "Товар уже существует!" })
      }

      let brand = await BrandModel.findOne({ name: brandObj.name })
      if (!brand) {
        brand = new BrandModel({
          name: brandObj.name,
          logoUrl: brandObj.logoUrl
        })
        await brand.save()
      }

      product = new ProductModel({
        title, description, price, sale, count, imageUrl, brand
      })

      await product.save()
      res.status(200).json({ message: "Товар успешно добавлен!" })
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Не удалось добавить товар!" })
    }
  }
}

module.exports = adminController