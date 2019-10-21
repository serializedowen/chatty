const jwt = require("jsonwebtoken");
const Service = {};
const invalidTokenError = require("../../errors/invalidTokenError");
const crypto = require("crypto");
const key = require("../../config/key");

Service.generateToken = (userData, permissions) => {
  return jwt.sign({ ...userData }, key, {
    algorithm: "HS256",
    expiresIn: "2h"
  });
};

Service.generateSaltedPassword = password => {
  let salt = crypto.randomBytes(8).toString("base64");
  // let salted = password.concat(salt);
  let saltedPassword = crypto
    .createHmac("sha256", key)
    .update(password.concat(salt))
    .digest("base64");

  return { salt, saltedPassword };
};

Service.verifyPassword = (password, salt, value) => {
  return (
    crypto
      .createHmac("sha256", key)
      .update("" + password + salt)
      .digest("base64") === value
  );
};

Service.decodeToken = token => {
  try {
    return jwt.verify(token, key);
  } catch (e) {
    throw invalidTokenError;
  }
};

// Service.
module.exports = Service;
