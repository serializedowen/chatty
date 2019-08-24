const router = require("koa-router")();
const User = require("../../db/user");
const isEmpty = require("lodash/isEmpty");
module.exports = router;

router.post("/new", async (ctx, next) => {
  let user = ctx.request.body;

  if (user && user.username && user.password) {
    await User.createUser(user.username, user.password.toString());
    ctx.status = 200;
  } else {
    ctx.status = 400;
    ctx.body = "Required value missing";
  }
  return next();
});

// router.post("/find", async (ctx, next) => {
//   let res = await User.findUser({
//     fieldName: "username",
//     value: ctx.request.body.username
//   });

//   if (!isEmpty(res.results)) {
//     ctx.body = res.results;
//   } else {
//     ctx.status = 404;
//   }
//   return next();
// });

router.post("/test", (ctx, next) => {
  ctx.body = ctx.request;
  // throw new Error("abcde");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});

router.get("/:id", async (ctx, next) => {
  let res = await User.findUser({ fieldName: "hash_id", value: ctx.params.id });
  if (!isEmpty(res.results)) {
    ctx.body = res.results;
  } else {
    ctx.status = 404;
  }
  return next();
});
