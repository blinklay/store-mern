const { default: mongoose } = require("mongoose");
const handleError = require("../helpers/handleErrors");
const ProductModel = require("../models/Product.model");

const checkProductExists = async function (req, res, next) {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Неверный ID запроса!" })
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Товар не найден!" });
    }

    req.product = product
    next()
  } catch (e) {
    handleError(res, e, "Ошибка сервера при проверке товара!")
  }
}

module.exports = checkProductExists 