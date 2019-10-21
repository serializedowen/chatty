const ClientError = require("./clientError");

const error = new ClientError("Token is invalid or expired");

module.exports = error;
