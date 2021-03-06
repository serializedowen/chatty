import Koa = require("koa");
import serve = require("koa-static");
import cors from "./middlewares/cors";
import errorCatch from "./middlewares/error";
import bodyParser = require("koa-bodyparser");
import logger from "./middlewares/logger";
import websocket from "./websocket";
import http = require("http");
import chalk from "chalk";
import router from "./router";
import emitter, { WS_READY } from "./emitter";

const app = new Koa();
const server = http.createServer(app.callback());
const ws = websocket(
  server
  // { transports: ["polling"] }
);
// export default ws;
// module.exports = ws;

ws.then(ws => emitter.emit(WS_READY, ws));

app.use(errorCatch);

// APIs
app.use(serve("public/static"));

if (process.env.NODE_ENV == "development") {
  console.log(chalk.green("logger enabled"));

  app.use(logger);
}
app.use(cors(["http://localhost:1212", "http://127.0.0.1:1212"]));

app.use(bodyParser());

// console.log(app);

app.use(router.routes());
server.listen(3000);
