const fs = require("fs");

const Router = require('@koa/router');
const datasourceService = require('../service/datasource');
const { debuglog } = require("util");

const getDatasourceByID = async (ctx) => {
	ctx.body = await datasourceService.getById(ctx.params.id);
};

const getAllDatasources = async (ctx) => {
	ctx.body = await datasourceService.getAll();
};

const getFileByName = async (ctx) => {
		var data = fs.readFileSync(`../2022-node-gr11/src/data/${ctx.params.name}`, "utf8");

				data = data.split("\r\n");
		for (let i in data) {
			data[i] = data[i].split(",");
		}	
		ctx.body = await data
}
/**
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/datasources',
	});

	router.get('/', getAllDatasources);
	router.get('/:id', getDatasourceByID);
	router.get('/file/:name', getFileByName);

	app.use(router.routes()).use(router.allowedMethods());
};