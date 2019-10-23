class ClientError extends Error {
  constructor(...props) {
    super(props);
    this._isClient = true;
    this.statusCode = 400;
  }
}

module.exports = ClientError;
