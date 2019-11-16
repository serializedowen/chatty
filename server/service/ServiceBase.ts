import emitter, { WS_READY } from "../emitter";
import { WSServer } from "../websocket";

// interface ServiceBase<T> {}

class ServiceBase<T> {
  _model: T;
  ws: WSServer;

  constructor(model: T) {
    this._model = model;

    /**
     * Inject websocket instance in runtime.
     */
    emitter.on(WS_READY, ws => {
      this.ws = ws;
    });
  }
}

export default ServiceBase;
