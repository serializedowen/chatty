import { Context } from "koa";
import ClientError from "../errors/clientError";
import { AuthService } from "../service";

export default function parseJWT(ctx: Context, next: Function) {
  const token = ctx.request.headers.authorization;
  if (!token) {
    ctx.status = 401;
    throw new ClientError("No token found");
  } else {
    ctx.user = AuthService.decodeToken(token);
    return next();
  }
}
