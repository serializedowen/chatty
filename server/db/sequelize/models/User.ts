// import Sequelize = require("sequelize");
import { Sequelize } from "sequelize";

import * as SequelizeStatic from "sequelize";
import { MessageInstance, MessageAttributes } from "./Message";
import { RoomInstance, RoomAttributes } from "./Room";

interface UserAttributes {
  id?: number;
  username: string;
  salt: string;
  password: string;
  email?: string;
  hashId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserInstance = SequelizeStatic.Instance<UserAttributes> &
  UserAttributes &
  UserAssociations & {
    dataValues: UserAttributes;
  };
export type UserModel = SequelizeStatic.Model<UserInstance, UserAttributes>;

export type UserAssociations = {
  getMessages?: SequelizeStatic.HasManyGetAssociationsMixin<MessageInstance>; // Note the null assertions!
  addMessage?: SequelizeStatic.HasManyAddAssociationMixin<
    MessageInstance,
    number
  >;
  hasMessage?: SequelizeStatic.HasManyHasAssociationMixin<
    MessageInstance,
    number
  >;
  countMessages?: SequelizeStatic.HasManyCountAssociationsMixin;
  createMessage?: SequelizeStatic.HasManyCreateAssociationMixin<
    MessageAttributes,
    MessageInstance
  >;

  getRooms?: SequelizeStatic.BelongsToManyGetAssociationsMixin<RoomInstance>; // Note the null assertions!
  addRoom?: SequelizeStatic.BelongsToManyAddAssociationMixin<
    RoomInstance,
    number,
    any
  >;
  hasRoom?: SequelizeStatic.BelongsToManyHasAssociationMixin<
    RoomInstance,
    number
  >;
  countRooms?: SequelizeStatic.BelongsToManyCountAssociationsMixin;
  createRoom?: SequelizeStatic.BelongsToManyCreateAssociationMixin<
    RoomAttributes,
    RoomInstance,
    any
  >;
};

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
      unique: true,
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
    hashId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    }
  });

  return User;
};
