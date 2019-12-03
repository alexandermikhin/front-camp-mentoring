const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    res.status(401).send('Access denied. No token provided');
    return;
  }

  try {
    const decoded = jwt.verify(token, config.authKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
};
