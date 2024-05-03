const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const serviceMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token is required" });
  }

  jwt.verify(authorization, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = serviceMiddleware;
