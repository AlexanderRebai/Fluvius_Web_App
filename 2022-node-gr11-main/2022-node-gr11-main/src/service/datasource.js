const config = require("config");
const { getChildLogger } = require("../core/logging");
const datasourceRepository = require("../repository/datasource");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("place-service");
  this.logger.debug(message, meta);
};
/**
 * Get all datasources.
 *
 */
const getAll = async () => {
  debugLog("Fetching all datasources", {});
  const data = await datasourceRepository.findAll();
  return data;
};
/**
 * Get datasource with the given `id`.
 *
 * @param {string} id - Id of the place to get.
 */
const getById = async (id) => {
  debugLog(`Fetching datasource with id ${id}`);
  return await datasourceRepository.findById(id);
};

module.exports = {
  getAll,
  getById,
};
