import Router = require("koa-router");
import parseJWT from "../../middlewares/parseJWT";
import { tokenFields } from "../../service/Auth";
import { UserService, RoomService } from "../../service";

const router = new Router<any, { user: tokenFields }>();

router.use(parseJWT);

router.post("/join-room", async (ctx, next) => {
  const { name } = ctx.request.body;
  const user = await UserService.findOne({
    where: { username: ctx.user.username }
  });

  if (user) {
    let room = await RoomService.findOne({ where: { name } });
    user.addRoom(room);

    ctx.status = 200;
  } else {
    ctx.status = 401;
  }
  return next();
});

router.post("/leave-room", async (ctx, next) => {
  const { name } = ctx.request.body;
  const user = await UserService.findOne({
    where: { username: ctx.user.username }
  });

  if (user) {
    let room = await RoomService.findOne({ where: { name } });
    user.removeRoom(room);
    ctx.status = 200;
  } else {
    ctx.status = 401;
  }
  return next();
});

module.exports = router;
export default router;
