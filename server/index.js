const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());
const serve = require("koa-static");
const router = require("./router");
const cors = require("./middlewares/cors");
const errorCatch = require("./middlewares/error");
const bodyParser = require("koa-bodyparser");

require("./websocket")(
  server
  // , { transports: "polling" }
);

// APIs
app.use(serve("public/static"));

if (process.env.NODE_ENV == "development") {
  console.log("logger enabled".bold());
  app.use(require("./middlewares/logger"));
}

app.use(cors(["http://localhost:5000", "http://127.0.0.1:5000"]));
app.use(errorCatch);
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());
server.listen(3000);
