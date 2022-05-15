const config = require("config");
const { getChildLogger } = require("../core/logging");
const categorieRepository = require("../repository/categorie");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("place-service");
  this.logger.debug(message, meta);
};
/**
 * Get all categories.
 *
 */
const getAll = async () => {
  debugLog("Fetching all categories", {});
  const data = await categorieRepository.findAll();
  return data;
};

/**
 * Get all categories with linked doelstellingen.
 *
 */
const getAllWithDoelstellingen = async () => {
  debugLog("Fetching all categories with doelstellingen");
  const data = await categorieRepository.findAllWithDoelstellingen();
  return data;
};

/**
 * Get all linked MVO Doelstellingen.
 *
 */
const getAllLinkedDoelstellingen = async () => {
  debugLog("Fetching all linked doelstellingen", {});
  const data = await categorieRepository.findLinkedDoelstellingen();
  return data;
};

/**
 * Get categorie with the given `id`.
 *
 * @param {string} id - Id of the place to get.
 */
const getById = async (id) => {
  debugLog(`Fetching categorie with id ${id}`);

  const categorie = await categorieRepository.findById(id);
  const doelstellingen = await categorieRepository.findLinkedDoelstellingenByID(
    id
  );
  return { categorie, doelstellingen };
};

module.exports = {
  getAll,
  getById,
  getAllLinkedDoelstellingen,
  getAllWithDoelstellingen,
};
