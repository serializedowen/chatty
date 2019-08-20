module.exports = origins => {
  let toAdd = [].concat(origins);
  return async (ctx, next) => {
    toAdd
      .filter(origin => ctx.request.headers.origin.includes(origin))
      .map(origin => ctx.set("Access-Control-Allow-Origin", origin));
    ctx.vary("Origin");
    // ctx.set("Access-Control-Allow-Origin", toAdd.join(", "));
    return next();
  };
};
