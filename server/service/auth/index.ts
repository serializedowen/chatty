import jwt = require("jsonwebtoken");
import invalidTokenError from "../../errors/invalidTokenError";
import crypto = require("crypto");
import key from "../../config/key";

class AuthService {
  static generateToken = (userData, permissions?) => {
    return jwt.sign({ ...userData }, key, {
      algorithm: "HS256",
      expiresIn: "2h"
    });
  };

  static generateSaltedPassword = (password: string) => {
    let salt = crypto.randomBytes(8).toString("base64");
    // let salted = password.concat(salt);
    let saltedPassword = crypto
      .createHmac("sha256", key)
      .update(password.concat(salt))
      .digest("base64");

    return { salt, saltedPassword };
  };

  static verifyPassword = (password: string, salt: string, value: string) => {
    return (
      crypto
        .createHmac("sha256", key)
        .update("" + password + salt)
        .digest("base64") === value
    );
  };

  static decodeToken = (token: string) => {
    try {
      return jwt.verify(token, key);
    } catch (e) {
      throw invalidTokenError;
    }
  };
}

export default AuthService;
