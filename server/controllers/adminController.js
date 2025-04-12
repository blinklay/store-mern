const UserModel = require("../models/User.model");
const BrandModel = require("../models/Brand.model");
const ProductModel = require("../models/Product.model");
const handleError = require("../helpers/handleErrors");
const RoleModel = require("../models/Role.model");

const adminController = {
  async getUsers(_, res) {
    try {
      const users = await UserModel.find().populate("roles")
      res.status(200).json({ users })
    } catch (e) {
      handleError(res, e, "Не удалось получить список пользователей!")
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
      handleError(res, e, "Не удалось добавить товар!")
    }
  },
  async addUserRole(req, res) {
    try {
      const { userId, roleName } = req.body;
      const user = await UserModel.findById(userId)
      const role = await RoleModel.findOne({ name: roleName })

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден!" })
      }

      if (!role) {
        return res.status(404).json({ message: "Такой роли не существует!" })
      }

      if (!user.roles.includes(role._id)) {
        user.roles.push(role._id)
        await user.save()
      }

      res.status(200).json({ message: "Роль успешно добавлена!" })
    } catch (e) {
      handleError(res, e, "Не удалось изменить роль!")
    }
  }
}

module.exports = adminController