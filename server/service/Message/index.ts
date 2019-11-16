import { DBInstance } from "../../db/sequelize";
import { MessageModel } from "../../db/sequelize/models/Message";
import createProxy from "../Proxy";
import ServiceBase from "../ServiceBase";

interface MessageService extends MessageModel {}

function Override(target: any, propertyKey, descriptor: PropertyDescriptor) {
  // console.log(target, propertyKey, descriptor);
  return descriptor;
}

class MessageService extends ServiceBase<MessageModel> {
  constructor(model: MessageModel) {
    super(model);
  }

  // @Override
  // create() {}
}

const service = createProxy(new MessageService(DBInstance.Message));

export default service;
