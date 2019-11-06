import Router = require("koa-router");
import UserService from "../../service/User";
import parseJWT from "../../middlewares/parseJWT";
import { tokenFields } from "../../service/Auth";
import { UserInstance } from "../../db/sequelize/models/User";

const router = new Router<any, { user: tokenFields; IUser: UserInstance }>();

router.use(parseJWT);

router.use("/:id", async (ctx, next) => {
  ctx.IUser = await UserService.findOne({
    where: {
      username: ctx.params.id
    }
  });
  return next();
});
router.get("/:id", async (ctx, next) => {
  if (ctx.IUser) {
    ctx.body = ctx.IUser.dataValues;
    ctx.status = 200;
  }
  return next();
});

router.get("/:id/messages", async (ctx, next) => {
  ctx.body = await ctx.IUser.getMessages();
  ctx.status = 200;
});

export default router;
module.exports = router;
