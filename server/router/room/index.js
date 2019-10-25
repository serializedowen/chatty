const router = require("koa-router")();

module.exports = router;

router.get("/test", (ctx, next) => {
  console.log("user");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});
