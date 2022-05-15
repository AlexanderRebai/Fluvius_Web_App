const config = require("config");
const { getChildLogger } = require("../core/logging");
const doelstellingRepository = require("../repository/mvoDoelstelling");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("place-service");
  this.logger.debug(message, meta);
};
/**
 * Get all doelstellingen.
 *
 */
const getAll = async () => {
  debugLog("Fetching all doelstellingen", {});
  const data = await doelstellingRepository.findAll();
  return data;
};
/**
 * Get all linked datasources.
 *
 */
const getAllLinkedDatasources = async () => {
  debugLog("Fetching all linked datasources");
  const data = await doelstellingRepository.findLinkedDatasources();
  return data;
};
/**
 * Get doelstelling with the given `id`.
 *
 * @param {string} id - Id of the place to get.
 */
const getById = async (id) => {
  debugLog(`Fetching doelstelling with id ${id}`);
  const doelstelling = await doelstellingRepository.findById(id);
  const datasources = await doelstellingRepository.findLinkedDatasourcesById(
    id
  );
  return { doelstelling, datasources };
};

module.exports = {
  getAll,
  getById,
  getAllLinkedDatasources,
};
