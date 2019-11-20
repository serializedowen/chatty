import io = require("socket.io");
import { UserService, AuthService, RoomService } from "../service";
import User, { UserInstance } from "../db/sequelize/models/User";
import { Server } from "http";
import emitter, { TEmitter, CREATED_ROOM } from "../emitter";
import { RoomInstance } from "../db/sequelize/models/Room";
import { tokenFields } from "../service/Auth";
import chalk from "chalk";

export type WSServer = SocketIO.Server & {
  emitter?: TEmitter;
};

export default async (server: Server, options?: io.ServerOptions) => {
  // import io = require("socket.io")(server, options)

  const websocket: WSServer = io(server, options);
  // sockets

  websocket.emitter = emitter;

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

  websocket.emitter.on(CREATED_ROOM, instance => {
    rooms.push(instance);
    websocket.emit("create", instance.dataValues);
  });

  websocket.on("connection", async socket => {
    try {
      let { username } = AuthService.decodeToken(
        socket.handshake.query.token
      ) as tokenFields;
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

        console.log(chalk.cyan(UserInstance.username + " just logged in"));
        onlineUsers.push(UserInstance);

        socket.on("message", async msg => {
          // UserInstance.createRoom();
          let message = await UserInstance.createMessage({ content: msg });
          RoomInstance.addMessage(message);
          websocket.send(`${UserInstance.username} says: ${msg}`);
        });

        socket.on("typing", () => {
          websocket.emit("typing", username + "isTyping");
        });

        socket.on("disconnect", e => {
          currentOnline--;
          onlineUsers = onlineUsers.filter(
            user => user.username === UserInstance.username
          );
          console.log(UserInstance.username + " just logged out");
        });
      } else {
        console.log("rejected");
        socket.disconnect(true);
      }
    } catch (error) {
      console.log("error validating token");
      socket.disconnect(true);
    }
  });

  return websocket;
};
