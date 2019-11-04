import crypto = require("crypto");
import LoginFailureError = require("../../errors/loginFailureError");
import AuthService = require("../auth");
import UsernameAlreadyExistsError = require("../../errors/usernameAlreadyExists");
import DBInstance from "../../db/sequelize/index";
import { UserModel } from "../../db/sequelize/models/User";

interface UserService {
  _model: UserModel;
}

class UserService {
  constructor(UserModel: UserModel) {
    this._model = UserModel;
  }

  tokenLogin = async token => {
    let { username } = AuthService.decodeToken(token);
    await this._model.findOne({ where: { username } });
  };

  login = async (username: string, password: string) => {
    let res = await this._model.findOne({ where: { username } });
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

  createUser = async (username: string, password: string) => {
    let res = await this._model.findAll({
      where: {
        username: username
      }
    });

    if (res.length != 0) {
      throw UsernameAlreadyExistsError;
    } else {
      let { saltedPassword, salt } = AuthService.generateSaltedPassword(
        password
      );

      return this._model.create({
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
}

const service = new UserService(DBInstance.models.User);

// service
//   .createUser("owen", "hwowen9455")
//   .then(() => service.login("owen", "hwowen9455"))
//   .then(console.log)
//   .catch(console.log);

export default service;

// UserService.tokenLogin = async token => {
//   let { username } = AuthService.decodeToken(token);
//   await User.findOne({ where: { username } });
// };

// UserService.login = async (username, password) => {
//   let res = await User.findOne({ where: { username } });
//   if (!res) {
//     throw LoginFailureError;
//   } else {
//     return AuthService.verifyPassword(
//       password,
//       res.dataValues.salt,
//       res.dataValues.password
//     );
//   }
// };

// UserService.createUser = async (username, password) => {
//   let res = await User.findAll({
//     where: {
//       username: username
//     }
//   });

//   if (res.length != 0) {
//     throw UsernameAlreadyExistsError;
//   } else {
//     let { saltedPassword, salt } = AuthService.generateSaltedPassword(password);

//     return User.create({
//       username,
//       password: saltedPassword,
//       hash_id: crypto
//         .createHash("md5")
//         .update(username)
//         .digest("hex"),
//       salt
//     });
//   }
// };

// UserService.createUser("owen", "hwowen9455")
//   .then(() => UserService.login("owen", "hwowen9455"))
//   .then(console.log)
//   .catch(console.log);
// UserService.login("123", "123456").then(console.log);
// export default UserService;
