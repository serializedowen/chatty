const router = require("koa-router")();
const fs = require("fs");

module.exports = router;

// CORS for development

router.post("/test", (ctx, next) => {
  ctx.body = ctx.request.body;
  // throw new Error("abcde");
  ctx.response.message = "done and done";

  // ctx.response.status = 200;
  return next();
});

// Mounting our sub router modules.  ## DIRECTORY PATTERN SHOULD MATCH OUR URL PATH.
fs.readdirSync(__dirname)
  .filter(item => fs.lstatSync(`${__dirname}/${item}`).isDirectory())
  .map(name => {
    router.use(`/${name}`, require(`./${name}`).routes());
  });

router.get("/signup", async (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.message = "done and done";
  ctx.type = "application/json";
  ctx.body = JSON.stringify({ token: "random" });
  await new Promise(resolve => {
    setTimeout(() => resolve(), 500);
  });
  return next();
});
