import Router = require("koa-router");
import UserService from "../../service/User";
import AuthService from "../../service/Auth";
import isEmpty = require("lodash/isEmpty");

const router = new Router();

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
    // const dbItem = result.dataValues;
    // result.
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

export default router;
module.exports = router;
