import ServiceBase from "../ServiceBase";
import {
  RoomModel,
  RoomInstance,
  RoomAttributes
} from "../../db/sequelize/models/Room";
import createProxy from "../Proxy";
import { DBInstance } from "../../db/sequelize";
import sequelize = require("sequelize");
import { CREATED_ROOM } from "../../emitter";

interface RoomService extends RoomModel {}

class RoomService extends ServiceBase<RoomModel> {
  private Rooms: RoomInstance[];

  constructor(model: RoomModel) {
    super(model);
    // this.Rooms = [];

    this._model.afterCreate(instance =>
      this.ws.emitter.emit(CREATED_ROOM, instance)
    );
  }
}

export default createProxy(new RoomService(DBInstance.Room));
