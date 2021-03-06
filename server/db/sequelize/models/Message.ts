import { Sequelize } from "sequelize";
import * as SequelizeStatic from "sequelize";
export interface MessageAttributes {
  id?: number;
  userId?: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  roomId?: number;
}

export type MessageInstance = SequelizeStatic.Instance<MessageAttributes> &
  MessageAttributes & {
    dataValues: MessageAttributes;
  };
export type MessageModel = SequelizeStatic.Model<
  MessageInstance,
  MessageAttributes
>;

export default (sequelize: Sequelize): MessageModel => {
  const Message = sequelize.define<MessageInstance, MessageAttributes>(
    "Message",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isUUID: 4
        }
      },
      // attributes
      content: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    }
  );

  return Message;
};
