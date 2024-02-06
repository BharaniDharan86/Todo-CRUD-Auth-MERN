const jwt = require("jsonwebtoken");

exports.createJWTToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};
