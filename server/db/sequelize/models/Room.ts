import { Sequelize } from "sequelize";
import * as SequelizeStatic from "sequelize";

interface RoomCreationAttributes {
  name: string;
}

export interface RoomAttributes extends RoomCreationAttributes {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type RoomInstance = SequelizeStatic.Instance<RoomAttributes> &
  RoomAttributes & {
    dataValues: RoomAttributes;
  };

export type RoomModel = SequelizeStatic.Model<
  RoomInstance,
  RoomAttributes,
  RoomCreationAttributes
>;

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
