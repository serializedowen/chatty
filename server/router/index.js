const router = require("koa-router")();
const fs = require("fs");
const cors = require("./cors");

module.exports = router;

// CORS for development
router.use(cors(["http://localhost:5000", "http://127.0.0.1:5000"]));

if (process.env.NODE_ENV == "development") {
  console.log("logger enabled".bold());
  router.use(require("./logger"));
}

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
