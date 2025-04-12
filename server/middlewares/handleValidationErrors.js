const { validationResult } = require("express-validator");

function handleValidationError(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Ошибка валидации данных!",
      errors: errors.array()
    })
  }

  next()
}

module.exports = handleValidationError