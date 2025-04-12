require('dotenv').config();
const RoleModel = require("../models/Role.model");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleError = require('../helpers/handleErrors');
const PASSWORD_HASH_LEVEL = 7
const JWT_SECRET = process.env.JWT_SECRET

const authController = {
  async register(req, res) {
    try {
      const { phoneNumber, password } = req.body
      const candidate = await UserModel.findOne({ phoneNumber })

      if (candidate) {
        return res.status(400).json({
          message: "Пользователь существует!"
        })
      }

      const passwordHash = bcrypt.hashSync(password, PASSWORD_HASH_LEVEL)
      let userRole = await RoleModel.findOne({ name: "user" })

      if (!userRole) {
        userRole = new RoleModel({ name: "user" })
        await userRole.save()
      }

      const user = new UserModel({
        phoneNumber,
        password: passwordHash,
        roles: [userRole._id]
      })

      await user.save()
      res.status(200).json({
        message: "Пользователь зарегестрирован!"
      })
    } catch (e) {
      handleError(res, e, "Не удалось зарегестрироваться!")
    }
  },
  async login(req, res) {
    try {
      const { password, phoneNumber } = req.body
      const user = await UserModel.findOne({ phoneNumber }).populate("roles")

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден!"
        })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Введен неверный пароль!"
        })
      }

      const token = jwt.sign({
        id: user._id,
        roles: user.roles.map(role => role.name)
      }, JWT_SECRET)

      res.cookie('token', token, { httpOnly: true })
      res.status(200).json({
        message: "Успешная авторизация!"
      })
    } catch (e) {
      handleError(res, e, "Не удалось авторизоваться!")
    }
  }
}

module.exports = authController
