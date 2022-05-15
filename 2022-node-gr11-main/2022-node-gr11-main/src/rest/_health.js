const Router = require('@koa/router');
const healthService = require('../service/health');

const ping = async (ctx) => {
  ctx.body = healthService.ping();
};

const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion();
};

/**
 * Install health routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installPlacesRoutes(app) {
  const router = new Router({
    prefix: '/health',
  });

  router.get('/ping', ping);
  router.get('/version', getVersion);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
