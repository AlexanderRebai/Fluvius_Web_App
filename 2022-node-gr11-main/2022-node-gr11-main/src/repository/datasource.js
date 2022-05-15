const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const findAll = () => {
  return getKnex()(tables.datasource)
};

/**
 * Find datasource with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
 const findByName = (name) => {
  return getKnex()(tables.datasource)
    .where('NAME', name)
    .first();
};
/**
 * Find datasource with the given `id`.
 *
 * @param {string} id - Id of the place to find.
 */
 const findById = (id) => {
  return getKnex()(tables.datasource)
    .where('DATASOURCEID', id)
    .first();
};

module.exports = {
  findAll,
  findById,
  findByName
};