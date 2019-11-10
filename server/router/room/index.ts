import Router = require("koa-router");
import parseJWT from "../../middlewares/parseJWT";
import { tokenFields } from "../../service/Auth";
import { RoomService } from "../../service";
import Room, { RoomInstance } from "../../db/sequelize/models/Room";
const router = new Router<any, { user: tokenFields; room: RoomInstance }>();

router.use(parseJWT);

router.post("/", async (ctx, next) => {
  let { name } = ctx.request.body;
  await RoomService.create({ name });
  ctx.status = 200;
});

router.get("/", async (ctx, next) => {
  let { limit, offset } = ctx.query;
  const rooms = await RoomService.findAll({
    limit: limit | 10,
    offset: offset | 0
  });
  ctx.body = rooms;
  ctx.status = 200;
  return next();
});

router.use("/:name", async (ctx, next) => {
  let { name } = ctx.params;
  const room = await RoomService.findOne({ where: { name } });
  if (!room) {
    ctx.status = 404;
    return;
  }

  ctx.room = room;
  return next();
});

router.get("/:name", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.room;
  return next();
});

router.get("/:name/messages", async (ctx, next) => {
  ctx.body = await ctx.room.getMessages();
  ctx.status = 200;
});

module.exports = router;
export default router;
