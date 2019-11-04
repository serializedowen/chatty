import ClientError from "./clientError";

const error = new ClientError("Token is invalid or expired");

export default error;
