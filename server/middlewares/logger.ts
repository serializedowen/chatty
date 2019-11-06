import { Context } from "koa";

export default async function logger(ctx: Context, next: Function) {
  console.log("Logger: " + ctx.request.url);
  let now = Date.now();
  await next();
  console.log("took " + (Date.now() - now) + "ms");
}
