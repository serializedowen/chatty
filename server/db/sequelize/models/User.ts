// import Sequelize = require("sequelize");
import { Sequelize } from "sequelize";

import * as SequelizeStatic from "sequelize";
interface UserAttributes {
  id?: Number;
  username: string;
  salt: string;
  password: string;
  email?: string;
  hash_id: string;
  createdAt?: string;
  updatedAt?: string;
}

type UserInstance = SequelizeStatic.Instance<UserAttributes> & UserAttributes;
export type UserModel = SequelizeStatic.Model<UserInstance, UserAttributes>;

export default (sequelize: Sequelize): UserModel => {
  const User = sequelize.define<UserInstance, UserAttributes>("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    // attributes
    username: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING(12),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255)
    },
    hash_id: {
      type: Sequelize.STRING(45),
      allowNull: false
    }
  });

  return User;

  // class User extends Model {}
  // User.init(
  //   {
  //     id: {
  //       type: DataTypes.INTEGER,
  //       autoIncrement: true,
  //       primaryKey: true,
  //       validate: {
  //         isUUID: 4
  //       }
  //     },
  //     // attributes
  //     username: {
  //       type: DataTypes.STRING(16),
  //       allowNull: false
  //     },
  //     salt: {
  //       type: DataTypes.STRING(12),
  //       allowNull: false
  //     },
  //     password: {
  //       type: DataTypes.STRING(255),
  //       allowNull: false
  //     },
  //     email: {
  //       type: DataTypes.STRING(255)
  //     },
  //     hash_id: {
  //       type: DataTypes.STRING(45),
  //       allowNull: false
  //     }
  //   },
  //   {
  //     sequelize,
  //     modelName: "User"
  //     // options
  //   }
  // );
};
