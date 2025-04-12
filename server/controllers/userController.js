const handleError = require("../helpers/handleErrors")
const ProductModel = require("../models/Product.model")
const UserModel = require("../models/User.model")

const userController = {
  async getSelf(req, res) {
    try {
      const { id } = req.user
      const user = await UserModel.findById(id).populate("cart").populate("favorites").populate("roles")

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден!" })
      }
      res.status(200).json({ user })
    } catch (e) {
      handleError(res, e, "Не удалось получить информацию!")
    }
  },
  logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true
      })

      res.status(200).json({ message: "Успешная деавторизация!" })
    } catch (e) {
      handleError(res, e, "Не удалось выйти!")
    }
  },
  async addToCart(req, res) {
    try {
      const { id: userId } = req.user;
      const { productId, quantity = 1 } = req.body;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Товар не найден!" });
      }

      const user = await UserModel.findOne({ _id: userId, "cart.product": productId });

      if (user) {

        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId, "cart.product": productId },
          { $inc: { "cart.$.quantity": quantity } },
          { new: true }
        ).populate("cart.product");

        return res.status(200).json({ message: "Количество товара увеличено!", cart: updatedUser.cart });
      } else {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId },
          { $push: { cart: { product: productId, quantity } } },
          { new: true }
        ).populate("cart.product");

        return res.status(200).json({ message: "Товар добавлен в корзину!", cart: updatedUser.cart });
      }
    } catch (e) {
      handleError(res, e, "Не удалось добавить товар в корзину!");
    }
  },
  async addToFavorites(req, res) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.body;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Товар не найден!" });
      }

      const user = await UserModel.findById(userId);

      if (user.favorites.includes(productId)) {
        return res.status(400).json({ message: "Этот товар уже в избранном!" });
      }

      await UserModel.findByIdAndUpdate(userId, {
        $addToSet: { favorites: productId }
      });

      return res.status(200).json({ message: "Товар добавлен в избранное!" });

    } catch (e) {
      handleError(res, e, "Не удалось добавить товар в избранное!");
    }
  }

}

module.exports = userController