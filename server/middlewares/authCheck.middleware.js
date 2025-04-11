const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Нет доступа!" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next()
  } catch (e) {
    console.error(e);
    res.status(403).json({ message: "Нет доступа!" })
  }
}

module.exports = checkAuth