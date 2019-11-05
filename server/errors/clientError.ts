interface ClientError extends Error {
  _isClient: boolean;
  statusCode: number;
}

class ClientError extends Error {
  constructor(...props) {
    //@ts-ignore
    super(props);
    this._isClient = true;
    this.statusCode = 400;
  }
}

export default ClientError;
