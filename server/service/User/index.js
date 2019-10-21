const { User } = require("../../db/sequelize/index").models;
const crypto = require("crypto");
const key = require("../../config/key");
const LoginFailureError = require("../../errors/loginFailureError");
const AuthService = require("../auth");
const UsernameAlreadyExistsError = require("../../errors/usernameAlreadyExists");

UserService = Object.create(Object);

UserService.tokenLogin = async token => {};

UserService.login = async (username, password) => {
  let res = await User.findOne({ where: { username } });
  if (!res) {
    throw LoginFailureError;
  } else {
    return AuthService.verifyPassword(
      password,
      res.dataValues.salt,
      res.dataValues.password
    );
  }
};

UserService.createUser = async (username, password) => {
  let res = await User.findAll({
    where: {
      username: username
    }
  });

  if (res.length != 0) {
    throw UsernameAlreadyExistsError;
  } else {
    let { saltedPassword, salt } = AuthService.generateSaltedPassword(password);

    return User.create({
      username,
      password: saltedPassword,
      hash_id: crypto
        .createHash("md5")
        .update(username)
        .digest("hex"),
      salt
    });
  }
};

UserService.createUser("owen", "hwowen9455")
  .then(() => UserService.login("owen", "hwowen9455"))
  .then(console.log)
  .catch(console.log);
// UserService.login("123", "123456").then(console.log);
module.exports = UserService;
