module.exports = (server, options) => {
  const io = require("socket.io")(server, options);
  // sockets

  io.use((socket, next) => {
    let token = socket.handshake.query.token;

    console.log(socket);
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

  return io;
};
