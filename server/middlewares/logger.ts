import { Context } from "koa";
import { upperCase } from "lodash";
import chalk from "chalk";

export default async function logger(ctx: Context, next: Function) {
  console.log(
    chalk.green(`Logger: ${upperCase(ctx.method)} ${ctx.request.url}`)
  );
  let now = Date.now();
  await next();

  let elapsed = Date.now() - now + "ms";
  console.log("took " + elapsed);
  ctx.set("X-ResponseTime", elapsed);
}
