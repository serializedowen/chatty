const router = require("koa-router")();
const UserService = require("../../service/User");

const isEmpty = require("lodash/isEmpty");
const escape = require("mysql").escape;
const AuthService = require("../../service/auth");

module.exports = router;

router.post("/login", async (ctx, next) => {
  let user = ctx.request.body;

  if (user && user.username && user.password) {
    let result = await UserService.login(
      user.username,
      user.password.toString()
    );
    // console.log(result.results);
    ctx.body = AuthService.generateToken({ username: user.username });
  } else {
    ctx.status = 400;
    ctx.body = "Required value missing";
  }
  return next();
});

router.get("/verify", async (ctx, next) => {});

router.post("/signup", async (ctx, next) => {
  let user = ctx.request.body;

  if (user && user.username && user.password) {
    let result = await UserService.createUser(
      user.username,
      user.password.toString()
    );
    console.log(result.results);
    ctx.body = AuthService.generateToken({ username: user.username });
  } else {
    ctx.status = 400;
    ctx.body = "Required value missing";
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

router.get("/:id", async (ctx, next) => {
  let res = await UserService.findOne({
    where: {
      hash_id: ctx.params.id
    }
  });
  if (!isEmpty(res)) {
    ctx.body = res.dataValues;
  } else {
    ctx.status = 404;
  }
  return next();
});
