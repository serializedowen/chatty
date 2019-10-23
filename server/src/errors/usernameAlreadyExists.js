const ClientError = require("./clientError");

const error = new ClientError("Username Already Exists!");

module.exports = error;
