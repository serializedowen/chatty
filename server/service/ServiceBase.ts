import sequelize = require("sequelize");

interface ServiceBase<T> {
  _model: T;
}

class ServiceBase<T> {
  constructor(model: T) {
    this._model = model;
  }
}

export default ServiceBase;
