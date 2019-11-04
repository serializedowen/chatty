import { Sequelize } from "sequelize";
import * as SequelizeStatic from "sequelize";

interface RoomAttributes extends RoomCreationAttributes {
  id?: Number;
  createdAt?: string;
  updatedAt?: string;
}

interface RoomCreationAttributes {
  name: string;
}

export type RoomInstance = SequelizeStatic.Instance<RoomAttributes> &
  RoomAttributes;

export type RoomModel = SequelizeStatic.Model<
  RoomInstance,
  RoomAttributes,
  RoomCreationAttributes
>;

export default (sequelize: Sequelize): RoomModel => {
  const attributes: SequelizeAttributes<RoomAttributes> = {
    name: {
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
