import { Sequelize, Model, DataTypes } from "sequelize";
import * as SequelizeStatic from "sequelize";
import { Message } from "./Message";
// import { MessageInstance, MessageAttributes } from "./Message";

// interface RoomCreationAttributes {
//   name: string;
//   id?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface RoomAttributes extends RoomCreationAttributes {

// }
export class Room extends Model {
  name: string;
  id?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  getMessages?: SequelizeStatic.HasManyGetAssociationsMixin<Message>; // Note the null assertions!
  addMessage?: SequelizeStatic.HasManyAddAssociationMixin<Message, number>;
  hasMessage?: SequelizeStatic.HasManyHasAssociationMixin<Message, number>;
  countMessages?: SequelizeStatic.HasManyCountAssociationsMixin;
  createMessage?: SequelizeStatic.HasManyCreateAssociationMixin<Message>;
}

// export type RoomInstance = SequelizeStatic.Instance<RoomAttributes> &
//   RoomAttributes &
//   RoomAssociations & {
//     dataValues: RoomAttributes;
//   };

// export type RoomModel = SequelizeStatic.Model<
//   RoomInstance,
//   RoomAttributes,
//   RoomCreationAttributes
// >;

// export type RoomAssociations = {
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
//   createMessage?: SequelizeStatic.HasManyCreateAssociationMixin<
//     MessageAttributes,
//     MessageInstance
//   >;
// };

// export default (sequelize: Sequelize): RoomModel => {
//   const attributes: SequelizeAttributes<RoomAttributes> = {
//     name: {
//       unique: true,
//       type: Sequelize.STRING(255),
//       allowNull: false
//     },
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       validate: {
//         isUUID: 4
//       }
//     }
//   };

//   return sequelize.define("Room", attributes);
// };

export default (sequelize: Sequelize) => {
  Room.init(
    {
      name: {
        unique: true,
        type: DataTypes.STRING(255),
        allowNull: false
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isUUID: 4
        }
      }
    },
    { tableName: "Room", sequelize }
  );
};
