const handleError = function (res, error, defaultMessage) {
  console.error(error);
  res.status(error.status || 500).json({
    message: defaultMessage || error.message
  })
}

module.exports = handleError