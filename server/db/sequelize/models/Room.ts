import { Sequelize } from "sequelize";
import * as SequelizeStatic from "sequelize";
import { MessageInstance, MessageAttributes } from "./Message";

interface RoomCreationAttributes {
  name: string;
}

export interface RoomAttributes extends RoomCreationAttributes {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type RoomInstance = SequelizeStatic.Instance<RoomAttributes> &
  RoomAttributes &
  RoomAssociations & {
    dataValues: RoomAttributes;
  };

export type RoomModel = SequelizeStatic.Model<
  RoomInstance,
  RoomAttributes,
  RoomCreationAttributes
>;

export type RoomAssociations = {
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
};

export default (sequelize: Sequelize): RoomModel => {
  const attributes: SequelizeAttributes<RoomAttributes> = {
    name: {
      unique: true,
      type: Sequelize.STRING(255),
      allowNull: false
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    }
  };

  return sequelize.define("Room", attributes);
};
