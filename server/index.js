const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("new connection");

  socket.on("message", msg => {
    console.log(msg);
    io.send(msg);
  });
});

io.on("disconnect", () => {
  console.log("dis");
});

server.listen(3000);
