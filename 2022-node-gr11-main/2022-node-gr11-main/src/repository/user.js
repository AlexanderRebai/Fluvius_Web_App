const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.user);
};

/**
 * Find user with the given `username`.
 *
 * @param {string} username - Username to look for.
 */
const findByName = (username) => {
  return getKnex()(tables.user).where("USERNAME", username).first();
};

/**
 * Find user_eid with the given `idnummer`.
 *
 * @param {string} idnummer - Idnummer to look for.
 */
const findByIdNummer = (idnummer) => {
  return getKnex()(tables.user_eid).where("IDNUMBER", idnummer).first();
};

/**
 * Find user with the given `id`.
 *
 * @param {string} id - Id of the place to find.
 */
const findById = (id) => {
  return getKnex()(tables.user).where("USERID", id).first();
};
module.exports = {
  findAll,
  findById,
  findByName,
  findByIdNummer,
};
