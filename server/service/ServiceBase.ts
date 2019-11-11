interface ServiceBase<T> {
  _model: T;
  ws: SocketIO.Server;
}

class ServiceBase<T> {
  constructor(model: T) {
    this._model = model;
  }
}

export default ServiceBase;
