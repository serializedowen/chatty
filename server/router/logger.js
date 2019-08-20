module.exports = async (ctx, next) => {
  let now = Date.now();
  await next();
  console.log("took " + (Date.now() - now) + "ms");
};
