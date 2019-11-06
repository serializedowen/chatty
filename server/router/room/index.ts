import Router = require("koa-router");

const router = new Router();

router.get("/test", (ctx, next) => {
  console.log("user");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  // console.log(ctx);
  return next();
});

router.post("", (ctx, next) => {
  console.log(ctx.request.body);
});

module.exports = router;
export default router;
