const Koa = require("koa");

const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
const serve = require("koa-static");
const router = require("./router");

// APIs
app.use(serve("public/static"));
app.use(router.routes());

// sockets
io.on("connection", socket => {
  if (!socket.request.headers) {
    socket.disconnect(true);
  } else {
    console.log("new connection");
    socket.on("message", msg => {
      console.log(msg);
      io.send(msg);
    });
  }
});

io.on("disconnect", () => {
  console.log("dis");
});

server.listen(3000);
