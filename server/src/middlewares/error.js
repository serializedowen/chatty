const isFunction = require("lodash/isFunction");
const ClientError = require("../errors/clientError");

module.exports = async function error(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (process.env.NODE_ENV == "development") {
      ctx.body = e.stack;
      ctx.status = 400;
      console.error(e.stack);
    } else {
      if (e.sqlMessage && e.sqlMessage.includes("Duplicate entry")) {
        ctx.status = 400;
        ctx.message = "Duplicate entry found.";
      }

      if (e instanceof ClientError) {
        console.log(e.statusCode);

        ctx.status = e.statusCode;
        ctx.message = e.message;
      } else {
        ctx.status = 500;
      }
    }
  }
};
