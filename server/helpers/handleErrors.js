const handleError = function (res, error, defaultMessage) {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || defaultMessage
  })
}

module.exports = handleError