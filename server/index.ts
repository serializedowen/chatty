import Koa = require("koa");
import serve = require("koa-static");
import router from "./router";
import cors from "./middlewares/cors";
import errorCatch from "./middlewares/error";
import bodyParser = require("koa-bodyparser");
import logger from "./middlewares/logger";
import websocket from "./websocket";
import http = require("http");

const app = new Koa();
const server = http.createServer(app.callback());

const ws = websocket(
  server
  // { transports: ["polling"] }
);

app.use(errorCatch);

// APIs
app.use(serve("public/static"));

if (process.env.NODE_ENV == "development") {
  console.log("logger enabled");

  app.use(logger);
}
app.use(cors(["http://localhost:5000", "http://127.0.0.1:5000"]));

app.use(bodyParser());

// console.log(app);

app.use(router.routes());
server.listen(3000);
