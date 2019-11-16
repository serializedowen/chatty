import Router = require("koa-router");
import fs = require("fs");
import { UserService, AuthService } from "../service";
import ClientError from "../errors/clientError";
import parseJWT from "../middlewares/parseJWT";

const router = new Router();

// CORS for development
router.post("/test", (ctx, next) => {
  ctx.body = ctx.request.body;
  // throw new Error("abcde");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});

router.get("/verify", async (ctx, next) => {
  const token = ctx.request.headers.authorization;
  if (!token) {
    ctx.status = 400;
    throw new ClientError("No token found");
  } else {
    ctx.status = 200;

    //@ts-ignore
    ctx.response.body = AuthService.decodeToken(token).username;
  }
});

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

/**
 * Mounting our sub router modules.  ## DIRECTORY PATTERN SHOULD MATCH OUR URL PATH.
 * e.g.,  A folder named user will be mounted as /api/user/~~~~~
 */
fs.readdirSync(__dirname)
  .filter(item => fs.lstatSync(`${__dirname}/${item}`).isDirectory())
  .map(name => {
    router.use(`/api/${name}`, require(`./${name}`).routes());
  });

export default router;
