module.exports = async function logger(ctx, next) {
  console.log("Logger: " + ctx.request);
  let now = Date.now();
  await next();
  console.log("took " + (Date.now() - now) + "ms");
};
