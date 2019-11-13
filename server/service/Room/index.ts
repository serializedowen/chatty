import ServiceBase from "../ServiceBase";
import { RoomModel, RoomInstance } from "../../db/sequelize/models/Room";
import createProxy from "../Proxy";
import { DBInstance } from "../../db/sequelize";

interface RoomService extends RoomModel {}

class RoomService extends ServiceBase<RoomModel> {
  Rooms: RoomInstance[];

  constructor(model: RoomModel) {
    super(model);
    // this.Rooms = [];
  }

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

export default createProxy(new RoomService(DBInstance.Room));
