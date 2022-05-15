const Router = require("@koa/router");
const categorieService = require("../service/categorie");

const getCategorieByID = async (ctx) => {
  ctx.body = await categorieService.getById(ctx.params.id);
};

const getAllCategories = async (ctx) => {
  ctx.body = await categorieService.getAll();
};

const getAllCategoriesWithDoelstellingen = async (ctx) => {
  ctx.body = await categorieService.getAllWithDoelstellingen();
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
    prefix: "/categories",
  });

  router.get("/", getAllCategories);
  router.get("/alldata/categories", getAllCategoriesWithDoelstellingen);
  router.get("/:id", getCategorieByID);

  app.use(router.routes()).use(router.allowedMethods());
};
