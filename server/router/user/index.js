const router = require("koa-router")();
const userDB = require("../../db/user");
const isEmpty = require("lodash/isEmpty");
module.exports = router;

router.get("/add", async (ctx, next) => {
  await userDB.createUser("aee", "123");
  ctx.status = 200;
  return next();
});

router.post("/add", async (ctx, next) => {});

router.get("/find", async (ctx, next) => {
  let res = await userDB.findUser("aee");

  if (!isEmpty(res.results)) {
    ctx.body = res.results;
  } else {
    ctx.status = 404;
  }
  return next();
});

router.post("/test", (ctx, next) => {
  ctx.body = ctx.request;
  // throw new Error("abcde");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});

router.get("/:id");
