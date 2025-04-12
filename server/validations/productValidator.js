const { body } = require("express-validator")

const productValidator = [
  body("title", "Минимальная длинна заголовка - 3 символа!")
    .trim()
    .escape()
    .isLength({ min: 3 }),

  body("description", "Минимальная длинна описания - 12 символов!")
    .trim()
    .escape()
    .isLength({ min: 12 }),

  body("price", "Цена не может быть менее 10!").isFloat({ min: 10 }),

  body("sale", "Максимальное значение скидки - 90%!")
    .optional()
    .isFloat({ max: 90 }),

  body("count", "Количество товара не может быть менее 1!").isInt({ min: 1 }),

  body("imageUrl", "Некорректная ссылка на изображение!")
    .optional()
    .isURL(),
];


module.exports = productValidator