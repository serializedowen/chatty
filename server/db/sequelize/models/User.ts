// import Sequelize = require("sequelize");
import { Sequelize, Model, DataTypes } from "sequelize";
import * as SequelizeStatic from "sequelize";
import { Message } from "./Message";
import { Room } from "./Room";

// import { MessageInstance, MessageAttributes, MessageModel } from "./Message";
// import { RoomInstance, RoomAttributes, RoomModel } from "./Room";

// interface UserAttributes {
//   id?: number;
//   username: string;
//   salt: string;
//   password: string;
//   email?: string;
//   hash_id: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

export class User extends Model {
  id?: number;
  username: string;
  salt: string;
  password: string;
  email?: string;
  hash_id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  getMessages?: SequelizeStatic.HasManyGetAssociationsMixin<Message>; // Note the null assertions!
  addMessage?: SequelizeStatic.HasManyAddAssociationMixin<Message, number>;
  hasMessage?: SequelizeStatic.HasManyHasAssociationMixin<Message, number>;
  countMessages?: SequelizeStatic.HasManyCountAssociationsMixin;
  createMessage?: SequelizeStatic.HasManyCreateAssociationMixin<Message>;

  getRooms?: SequelizeStatic.BelongsToManyGetAssociationsMixin<Room>; // Note the null assertions!
  addRoom?: SequelizeStatic.BelongsToManyAddAssociationMixin<Room, number>;
  hasRoom?: SequelizeStatic.BelongsToManyHasAssociationMixin<Room, number>;
  countRooms?: SequelizeStatic.BelongsToManyCountAssociationsMixin;
  createRoom?: SequelizeStatic.BelongsToManyCreateAssociationMixin<Room>;
}

// export type UserInstance = SequelizeStatic.Model<UserAttributes> &
//   UserAttributes &
//   UserAssociations & {
//     dataValues: UserAttributes;
//   };
// export type UserModel = SequelizeStatic.Model<UserInstance, UserAttributes>;

// export type UserAssociations = {
//   getMessages?: SequelizeStatic.HasManyGetAssociationsMixin<MessageInstance>; // Note the null assertions!
//   addMessage?: SequelizeStatic.HasManyAddAssociationMixin<
//     MessageInstance,
//     number
//   >;
//   hasMessage?: SequelizeStatic.HasManyHasAssociationMixin<
//     MessageInstance,
//     number
//   >;
//   countMessages?: SequelizeStatic.HasManyCountAssociationsMixin;
//   createMessage?: SequelizeStatic.HasManyCreateAssociationMixin<MessageModel>;

//   getRooms?: SequelizeStatic.BelongsToManyGetAssociationsMixin<RoomInstance>; // Note the null assertions!
//   addRoom?: SequelizeStatic.BelongsToManyAddAssociationMixin<
//     RoomInstance,
//     number
//   >;
//   hasRoom?: SequelizeStatic.BelongsToManyHasAssociationMixin<
//     RoomInstance,
//     number
//   >;
//   countRooms?: SequelizeStatic.BelongsToManyCountAssociationsMixin;
//   createRoom?: SequelizeStatic.BelongsToManyCreateAssociationMixin<RoomModel>;
// };

// export default (sequelize: Sequelize): UserModel => {
//   const User = sequelize.define("User", {
//     id: {
//       type: SequelizeStatic.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       validate: {
//         isUUID: 4
//       }
//     },
//     // attributes
//     username: {
//       type: SequelizeStatic.STRING(16),
//       unique: true,
//       allowNull: false
//     },
//     salt: {
//       type: SequelizeStatic.STRING(12),
//       allowNull: false
//     },
//     password: {
//       type: SequelizeStatic.STRING(255),
//       allowNull: false
//     },
//     email: {
//       type: SequelizeStatic.STRING(255)
//     },
//     hash_id: {
//       type: SequelizeStatic.STRING(45),
//       allowNull: false
//     }
//   });

//   return User;
// };

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isUUID: 4
        }
      },
      // attributes
      username: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(12),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255)
      },
      hash_id: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { tableName: "User", sequelize }
  );
};
