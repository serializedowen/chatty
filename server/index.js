const Koa = require("koa");

const app = new Koa();
const server = require("http").createServer(app.callback());
const serve = require("koa-static");
const router = require("./router");

require("./websocket")(server, { transports: "polling" });

// APIs
app.use(serve("public/static"));
app.use(router.routes());

server.listen(3000);
