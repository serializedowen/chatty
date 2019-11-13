import io = require("socket.io");
import { UserService, AuthService, RoomService } from "../service";
import User, { UserInstance } from "../db/sequelize/models/User";

export default async (server: any, options?: io.ServerOptions) => {
  // import io = require("socket.io")(server, options)

  const websocket = io(server, options);
  // sockets

  let onlineUsers: UserInstance[] = [];
  let rooms = await RoomService.findAll();
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
        const [RoomInstance, isCreated] = await RoomService.findOrCreate({
          where: { name: "test" }
        });

        await UserInstance.addRoom(RoomInstance);

        // UserInstance.getRooms().then(console.log);
        UserInstance.getRooms().then(rooms =>
          rooms.map(ins => socket.join(ins.name))
        );

        currentOnline++;
        console.log(UserInstance.username + " just logged in");
        onlineUsers.push(UserInstance);

        socket.on("message", async msg => {
          // UserInstance.createRoom();
          let message = await UserInstance.createMessage({ content: msg });
          RoomInstance.addMessage(message);
          websocket.send(`${UserInstance.username} says: ${msg}`);
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
