import { Context } from "koa";

export default async function logger(ctx: Context, next: Function) {
  console.log("Logger: " + ctx.request.url);
  let now = Date.now();
  await next();

  let elapsed = Date.now() - now + "ms";
  console.log("took " + elapsed);
  ctx.set("X-ResponseTime", elapsed);
}
