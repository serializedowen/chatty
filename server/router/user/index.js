const router = require("koa-router")();
const userDB = require("../../db/user");
module.exports = router;

router.get("/add", async (ctx, next) => {
  await userDB.createUser("eag", "123");
  ctx.status = 200;
  return next();
});

router.get("/find", async (ctx, next) => {
  let res = await userDB.findUser("eag");
  console.log(res);
  return next();
});

router.get("/test", (ctx, next) => {
  throw new Error("abcde");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});
