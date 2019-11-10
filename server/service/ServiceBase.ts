// import { a } from "../websocket";

interface ServiceBase<T> {
  _model: T;
  ws: SocketIO.Server;
}

class ServiceBase<T> {
  constructor(model: T) {
    this._model = model;
    // this.ws = ws;
  }
}

export default ServiceBase;
