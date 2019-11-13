import ServiceBase from "../ServiceBase";
import { Room } from "../../db/sequelize/models/Room";
import createProxy from "../Proxy";
import { DBInstance } from "../../db/sequelize";

interface RoomService extends Room {}

class RoomService extends ServiceBase<Room> {
  Rooms: Room[];

  constructor(model) {
    super(model);

    // this.Rooms = [];
  }

  //@Override
  create() {
    this._model
      .create(arguments)
      .bind(this._model)
      .then(RoomInstance => {
        this.ws.emit("CREATE_ROOM", RoomInstance);
        this.Rooms.push(RoomInstance);
        return RoomInstance;
      });
  }
}

const a = new RoomService(Room);

export default createProxy(new RoomService(Room));
