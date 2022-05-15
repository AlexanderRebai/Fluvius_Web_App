const Router = require('@koa/router');
const installHealthRouter = require('./_health');
const installUserRouter = require('./_users')
const installDoelstellingRouter = require('./_mvoDoelstellingen')
const installCategorieRouter = require('./_categories')
const installDatasourceRouter = require('./_datasources')
const installSDGRouter = require('./_sdgs')
const installTemplateRouter = require('./_template')

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});

	installHealthRouter(router);
	installUserRouter(router);
	installDoelstellingRouter(router);
	installCategorieRouter(router);
	installDatasourceRouter(router);
	installSDGRouter(router);
	installTemplateRouter(router);

	app.use(router.routes()).use(router.allowedMethods());
};
