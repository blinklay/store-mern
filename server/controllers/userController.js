const { default: mongoose } = require("mongoose")
const handleError = require("../helpers/handleErrors")
const ProductModel = require("../models/Product.model")
const UserModel = require("../models/User.model")

const userController = {
  async getSelf(req, res) {
    try {
      const { id } = req.user
      const user = await UserModel.findById(id).populate("cart").populate("cart.product").populate("favorites").populate("roles")

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден!" })
      }
      res.status(200).json({ user })
    } catch (e) {
      handleError(res, e, "Не удалось получить информацию!")
    }
  },
  logout(_, res) {
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
      const { _id: productId } = req.product
      const { q: quantity } = req.query

      const user = await UserModel.findOne({ _id: userId, "cart.product": productId });

      if (user) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId, "cart.product": productId },
          { $inc: { "cart.$.quantity": 1 } },
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
      const { _id: productId } = req.product

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
  },
  async removeFromCart(req, res) {
    try {
      const { id: userId } = req.user;
      const { _id: productId } = req.product

      const user = await UserModel.findOne({ _id: userId, "cart.product": productId }).populate("cart")
      if (!user) {
        return res.status(404).json({ message: "Товара нет в корзине!" })
      }
      const cartItem = user.cart.find(item => item.product.toString() === productId.toString());
      console.log(cartItem);

      if (!cartItem) {
        res.status(404).json({ message: "Товраа нет в корзине!" })
      }

      if (cartItem.quantity <= 1) {
        await UserModel.findOneAndUpdate({ _id: userId }, {
          $pull: { cart: { product: productId } }
        })
        return res.status(200).json({ message: "Товар удален из корзины!" })
      } else {
        await UserModel.findOneAndUpdate(
          { _id: userId, "cart.product": productId },
          { $inc: { "cart.$.quantity": -1 } }
        );
        return res.status(200).json({ message: "Количество товара уменьшено!" });
      }
    } catch (e) {
      handleError(res, e, "Не удалось уменьшить количество товара!")
    }
  },
  async removeFromFavorites(req, res) {
    try {
      const { id: userId } = req.user;
      const { _id: productId } = req.product

      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { favorites: productId } },
        { new: true }
      )

      res.status(200).json({ message: "Товар удален из избранного!" })
    } catch (e) {
      handleError(res, e, "Не удалось убрать товара из избранного!")
    }
  }
}

module.exports = userController