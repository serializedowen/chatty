const router = require("koa-router")();
const userDB = require("../../db/user");
module.exports = router;

router.get("/add", async (ctx, next) => {
  let res = await userDB.createUser("abc", "123");
  console.log(res);
  return next();
});
router.get("/test", (ctx, next) => {
  console.log("user");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});
