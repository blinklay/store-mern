function checkRole(roleByCheck) {
  return function (req, res, next) {
    try {
      const userRoles = req.user.roles
      if (!userRoles) {
        return res.status(401).json({
          message: "Нет доступа!"
        })
      }

      if (!userRoles.includes(roleByCheck)) {
        return res.status(401).json({
          message: "Недостаточно прав!"
        })
      }

      next()
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Не удалось проверить роль!" })
    }
  }
}

module.exports = checkRole