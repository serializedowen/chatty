import ServiceBase from "../ServiceBase";
import { RoomModel } from "../../db/sequelize/models/Room";
import createProxy from "../Proxy";
import { DBInstance } from "../../db/sequelize";

interface RoomService extends RoomModel {}

class RoomService extends ServiceBase<RoomModel> {
  constructor(model: RoomModel) {
    super(model);
  }
}

export default createProxy(new RoomService(DBInstance.Room));
