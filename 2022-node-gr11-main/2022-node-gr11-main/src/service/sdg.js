const config = require("config");
const { getChildLogger } = require("../core/logging");
const sdgRepository = require("../repository/sdg");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("place-service");
  this.logger.debug(message, meta);
};
/**
 * Get all sdgs.
 *
 */
const getAll = async () => {
  debugLog("Fetching all sdgs", {});
  const data = await sdgRepository.findAll();
  return data;
};
/**
 * Get sdg with the given `id`.
 *
 * @param {string} id - Id of the sdg to get.
 */
const getById = async (id) => {
  debugLog(`Fetching sdg with id ${id}`);
  const SDG = await sdgRepository.findById(id);
  const subSDGs = await sdgRepository.findSubSDGsByMainSDG(id);
  return { SDG, subSDGs };
};
/**
 * Get sdg with the given `id`.
 *
 * @param {string} id - Id of the sdg to get.
 */
const getALlLinkedSDGs = async () => {
  debugLog(`Fetching linked sdgs`);
  return sdgRepository.findLinkedSDGs();
};

/**
 * Get subsdgs with the given mainsdg`id`.
 *
 * @param {string} id - Id of the mainsdg to get.
 */
const getSubSDGsByMainSDG = async (id) => {
  debugLog(`Fetching linked subsdgs`);
  return sdgRepository.findSubSDGsByMainSDG(id);
};

module.exports = {
  getAll,
  getById,
  getALlLinkedSDGs,
  getSubSDGsByMainSDG,
};
