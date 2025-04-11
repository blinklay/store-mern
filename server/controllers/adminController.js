const UserModel = require("../models/User.model");

const adminController = {
  async getUsers(_, res) {
    try {
      const users = await UserModel.find()
      res.status(200).json({ users })
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Не удалось получить список пользователей!" })
    }
  }
}

module.exports = adminController