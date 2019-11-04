import crypto = require("crypto");
import LoginFailureError = require("../../errors/loginFailureError");
import AuthService from "../auth";
import UsernameAlreadyExistsError = require("../../errors/usernameAlreadyExists");
import DBInstance from "../../db/sequelize/index";
import { UserModel } from "../../db/sequelize/models/User";
import { isFunction } from "lodash";

interface UserService extends UserModel {
  _model: UserModel;
}

class UserService {
  constructor(UserModel: UserModel) {
    this._model = UserModel;
  }

  tokenLogin = async (token: string) => {
    //@ts-ignore
    let { username } = AuthService.decodeToken(token);
    await this._model.findOne({ where: { username } });
  };

  login = async (username: string, password: string) => {
    let res = await this._model.findOne({ where: { username } });
    if (!res) {
      throw LoginFailureError;
    } else {
      return AuthService.verifyPassword(password, res.salt, res.password);
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

// const service = new UserService(DBInstance.models.User);

/**
 * Proxy function calls to underlying Model if not found on Service Instance
 */
const service = new Proxy(new UserService(DBInstance.models.User), {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      if (isFunction(obj._model[prop])) {
        // Function.call();
        return (...args) => obj._model[prop].call(obj._model, ...args);
      }
      return obj._model[prop];
    }
  }
});

// service
//   .createUser("owen", "hwowen9455")
//   .then(() => service.login("owen", "hwowen9455"))
//   .then(console.log)
//   .catch(console.log);

export default service;
