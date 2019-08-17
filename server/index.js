const Koa = require("koa"),
  route = require("koa-route"),
  websockify = require("koa-websocket");

const app = websockify(new Koa());

app.ws.onConnection();

app.listen(3000);
