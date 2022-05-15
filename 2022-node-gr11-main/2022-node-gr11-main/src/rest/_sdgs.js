const Router = require("@koa/router");
const sdgService = require("../service/sdg");

const getSdgByID = async (ctx) => {
  ctx.body = await sdgService.getById(ctx.params.id);
};

const getAllsdgs = async (ctx) => {
  ctx.body = await sdgService.getAll();
};

const getALlLinkedSDGs = async (ctx) => {
  ctx.body = await sdgService.getALlLinkedSDGs();
};

const getSubSDGSByMainSDGs = async (ctx) => {
  ctx.body = await sdgService.getALlLinkedSDGs(ctx.params.id);
};

/**
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/sdgs",
  });

  router.get("/", getAllsdgs);
  router.get("/:id", getSdgByID);
  router.get("/all/sdgs", getALlLinkedSDGs);
  router.get("/linked/:id", getSubSDGSByMainSDGs);

  app.use(router.routes()).use(router.allowedMethods());
};
