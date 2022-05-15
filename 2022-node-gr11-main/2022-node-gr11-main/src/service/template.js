const config = require("config");
const { getChildLogger } = require("../core/logging");
const templateRepository = require("../repository/template");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("template-service");
  this.logger.debug(message, meta);
};
/**
 * Get all categories.
 *
 */
const getAll = async () => {
  debugLog("Fetching all templates", {});
  const data = await templateRepository.findAll();
  return data;
};

/**
 * Get categorie with the given `id`.
 *
 * @param {string} id - Id of the place to get.
 */
const updateById = async (id, {role, template, categorieIDs}) => {
    debugLog(`Updating template with id ${id}`);
    const newTemplate = await templateRepository.updateById(id, {role, template, categorieIDs});
    return newTemplate;
  };

  const getById = async (id) => {
    debugLog(`Fetching template with id ${id}`);
  
    const template = await templateRepository.findById(id);
    const categories = await templateRepository.findLinkedCategoriesByID(id);
    return { template, categories };
  };

module.exports = {
  getAll,
  updateById,
  getById,
};
