import { DBInstance } from "../../db/sequelize";
import { MessageModel } from "../../db/sequelize/models/Message";

interface MessageService extends MessageModel {
  _model: MessageModel;
}

class MessageService {
  constructor(model: MessageModel) {
    this._model = model;
  }
}

/**
 * Proxy function calls to underlying Model if not found on Service Instance
 */
const service = new Proxy(new MessageService(DBInstance.Message), {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      if (
        Object.prototype.toString.call(obj._model[prop]) === "[object Function]"
      ) {
        // Function.call();
        return (...args) => obj._model[prop].call(obj._model, ...args);
      }
      return obj._model[prop];
    }
  }
});
