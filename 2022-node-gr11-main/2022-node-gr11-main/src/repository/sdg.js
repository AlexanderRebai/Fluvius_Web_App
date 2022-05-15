const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.sdg);
};

/**
 * Find sdg with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = (name) => {
  return getKnex()(tables.sdg).where("NAME", name).first();
};
/**
 * Find sdg with the given `id`.
 *
 * @param {string} id - Id of the sdg to find.
 */
const findById = (id) => {
  return getKnex()(tables.sdg).where("SDGID", id).first();
};
/**
 * Find sdg.
 *
 * @param {string} id - Id of the sdg to find.
 */
const findLinkedSDGs = () => {
  return getKnex()(tables.sdg).join("sdg as s2", "s2.mainSDGid", "sdg.SDGID");
};

/**
 * Find sdg.
 *
 * @param {string} id - Id of the mainsdg to find.
 */
const findSubSDGsByMainSDG = (id) => {
  return getKnex()(tables.sdg)
    .join("sdg as s2", "s2.mainSDGid", "sdg.DBID")
    .where("sdg.SDGID", id)
    .orderBy("s2.NAME");
};

module.exports = {
  findAll,
  findById,
  findByName,
  findLinkedSDGs,
  findSubSDGsByMainSDG,
};
