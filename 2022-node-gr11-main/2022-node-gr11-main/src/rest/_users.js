const Router = require("@koa/router");
const userService = require("../service/user");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const getUserById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
};

const getUserByName = async (ctx) => {
  ctx.body = await userService.getByName(ctx.params.username);
};

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
};

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const session = await userService.login(username, password);
  ctx.body = session;
};

//e-id
const login_eid = async (ctx) => {
  const { idnumber, password } = ctx.request.body;
  const session = await userService.loginE_id(idnumber, password);
  ctx.body = session;
};

const getUserByIdNumber = async (ctx) => {
  ctx.body = await userService.getByIdNumber(ctx.params.idnumber);
};

//Middleware om onderscheid te maken tss bevoegdheden vd verschillende rollen
const requireDirector = makeRequireRole(Role.DIRECTOR);
const requireManager = makeRequireRole(Role.MANAGER);
const requireMVO = makeRequireRole(Role.MVO);

/**
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/users",
  });

  router.get("/", getAllUsers);
  router.get("/:id", getUserById);
  router.get("/eid/:idnumber", getUserByIdNumber);
  router.get("/name/:username", getUserByName);
  router.post("/login", login);
  router.post("/logineid", login_eid);

  app.use(router.routes()).use(router.allowedMethods());
};
