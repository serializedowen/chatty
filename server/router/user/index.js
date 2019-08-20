const router = require("koa-router")();

module.exports = router;

router.get("/*", (ctx, next) => {
  next();
  ctx.response.status = 502;
});

router.get("/:userId", (ctx, next) => {});

router.get("/test", (ctx, next) => {
  console.log("user");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});
