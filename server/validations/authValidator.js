const { body } = require("express-validator")

const authValidator = [
  body("phoneNumber", "Номер телефона некорректный!").isMobilePhone("ru-RU", { strictMode: true }),
  body("password", "Минимальная длинна пароля - 6 символов!").isLength({ min: 6 })
]

module.exports = {
  authValidator
}