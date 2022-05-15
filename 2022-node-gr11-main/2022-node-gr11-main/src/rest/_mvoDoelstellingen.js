const Router = require("@koa/router");
const doelstellingService = require("../service/mvoDoelstelling");

const getDoelstellingByID = async (ctx) => {
  ctx.body = await doelstellingService.getById(ctx.params.id);
};

const getAllDoelstellingen = async (ctx) => {
  ctx.body = await doelstellingService.getAll();
};

const getAllLinkedDatasources = async (ctx) => {
  ctx.body = await doelstellingService.getAllLinkedDatasources();
};

/**
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/doelstellingen",
  });

  router.get("/", getAllDoelstellingen);
  router.get("/all/datasources", getAllLinkedDatasources);
  router.get("/:id", getDoelstellingByID);

  app.use(router.routes()).use(router.allowedMethods());
};
