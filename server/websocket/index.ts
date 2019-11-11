import io = require("socket.io");
import { UserService, AuthService } from "../service";
import User, { UserInstance } from "../db/sequelize/models/User";

export default (server: any, options?: io.ServerOptions) => {
  // import io = require("socket.io")(server, options)

  const websocket = io(server, options);
  // sockets

  let onlineUsers: UserInstance[] = [];
  let currentOnline = 0;

  websocket.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
      return next();
    } else {
      socket.disconnect(true);
    }
  });

  websocket.on("connection", async socket => {
    try {
      //@ts-ignore
      let { username } = AuthService.decodeToken(socket.handshake.query.token);
      let UserInstance = await UserService.findOne({ where: { username } });
      if (UserInstance) {
        // UserInstance.getRooms().then(console.log);
        UserInstance.getRooms().then(rooms =>
          rooms.map(ins => socket.join(ins.name))
        );

        currentOnline++;
        console.log(UserInstance.username + " just logged in");
        onlineUsers.push(UserInstance);

        socket.on("message", msg => {
          UserInstance.createRoom();
          UserInstance.createMessage({ content: msg });
          websocket.send(`${UserInstance.username} says: msg`);
        });

        socket.on("disconnect", e => {
          currentOnline--;
          onlineUsers = onlineUsers.filter(
            user => user.username === UserInstance.username
          );
          console.log(UserInstance.username + " just logged out");
        });
      } else {
        socket.disconnect(true);
      }
    } catch (error) {
      socket.disconnect(true);
    }
  });

  return websocket;
};
