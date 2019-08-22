const isFunction = require("lodash/isFunction");

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (process.env.NODE_ENV == "development") {
      console.log(e);
      ctx.body = e;
      ctx.status = 400;
    } else {
      if (e.sqlMessage && e.sqlMessage.includes("Duplicate entry")) {
        ctx.status = 400;
        ctx.message = "Duplicate entry found.";
      }
    }
  }
};
