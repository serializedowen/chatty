import io = require("socket.io");

export default (server: any, options?: io.ServerOptions) => {
  // import io = require("socket.io")(server, options)

  const websocket = io(server, options);
  // sockets

  let currentOnline = 0;

  websocket.use((socket, next) => {
    let token = socket.handshake.query.token;

    if (token) {
      return next();
    } else {
      socket.disconnect(true);
    }
  });

  websocket.on("connection", socket => {
    console.log("new connection");
    currentOnline++;
    socket.on("message", msg => {
      console.log(msg);
      websocket.send(msg);
    });
  });

  websocket.on("disconnect", () => {
    currentOnline--;
    console.log("dis");
  });

  return websocket;
};
