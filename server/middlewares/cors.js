module.exports = origins => {
  let toAdd = [].concat(origins);
  return async function cors(ctx, next) {
    if (ctx.get("Origin")) {
      toAdd
        .filter(origin => ctx.get("Origin").includes(origin))
        .map(origin => {
          ctx.set("Access-Control-Allow-Credentials", true);
          ctx.set(
            "Access-Control-Allow-Methods",
            "OPTIONS, GET, PUT, POST, DELETE"
          );
          ctx.set(
            "Access-Control-Allow-Headers",
            ctx.get("Access-Control-Request-Headers")
          );
          ctx.set("Access-Control-Allow-Origin", origin);
        });
      ctx.vary("Origin");
    }

    if (ctx.method == "OPTIONS") {
      ctx.status = 204;
    }
    return next();
  };
};
