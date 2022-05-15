const Router = require("@koa/router");
const templateService = require("../service/template");


const getAllTemplates = async (ctx) => {
  ctx.body = await templateService.getAll();
};

const getTemplateByID = async (ctx) => {
  ctx.body = await templateService.getById(ctx.params.id);
};

const updateTemplateById = async (ctx) => {
  const template = await templateService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = template;
  console.log(ctx.params.id);
};

// const getAllLinkedDoelstellingen = async (ctx) => {
//   ctx.body = await categorieService.getAllLinkedDoelstellingen();
// };

/**
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/template",
  });

  router.get("/", getAllTemplates);
  router.post("/:id", updateTemplateById);
  router.get("/:id", getTemplateByID);

  app.use(router.routes()).use(router.allowedMethods());
};
