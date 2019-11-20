import crypto = require("crypto");
import createProxy from "../Proxy";
import ServiceBase from "../ServiceBase";
import AuthService, { tokenFields } from "../Auth";
import LoginFailureError = require("../../errors/loginFailureError");
import UsernameAlreadyExistsError from "../../errors/usernameAlreadyExists";
import { DBInstance } from "../../db/sequelize";
import { UserModel } from "../../db/sequelize/models/User";

// type UserService = ServiceBase<UserModel> & UserModel;

interface UserService extends UserModel {}

class UserService extends ServiceBase<UserModel> {
  constructor(model: UserModel) {
    super(model);
  }

  tokenLogin = async (token: string) => {
    let { username } = AuthService.decodeToken(token) as tokenFields;
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
        // hash_id: crypto
        //   .createHash("md5")
        //   .update(username)
        //   .digest("hex"),
        salt
      });
    }
  };
}

const service = createProxy(new UserService(DBInstance.User));

export default service;
