import { DBInstance } from "../../db/sequelize";
import { MessageModel } from "../../db/sequelize/models/Message";
import createProxy from "../Proxy";
import ServiceBase from "../ServiceBase";

interface MessageService extends MessageModel {}

class MessageService extends ServiceBase<MessageModel> {
  constructor(model: MessageModel) {
    super(model);
  }
}

const service = createProxy(new MessageService(DBInstance.Message));

export default service;
