const Koa = require("koa");

const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server, { transports: "polling" });
const serve = require("koa-static");
const router = require("./router");

// APIs
app.use(serve("public/static"));
app.use(router.routes());

// sockets

io.use((socket, next) => {
  let token = socket.handshake.query.token;

  console.log(token);
  if (token) {
    return next();
  } else {
    socket.disconnect(true);
  }
});
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
