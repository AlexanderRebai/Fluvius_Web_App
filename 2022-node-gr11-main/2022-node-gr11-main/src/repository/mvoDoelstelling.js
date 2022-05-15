const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.doelstelling)
    .leftJoin(
      "doelstellingleaf_datasource as dd",
      "adoelstelling.DOELSTELLINGID",
      "dd.DoelstellingLeaf_DOELSTELLINGID"
    )
    .leftJoin(
      "datasource as da",
      "da.DATASOURCEID",
      "dd.datasources_DATASOURCEID"
    );
};

const findLinkedDatasources = () => {
  return getKnex()(tables.doelstelling)
    .join(
      "doelstellingleaf_datasource",
      "adoelstelling.DOELSTELLINGID",
      "doelstellingleaf_datasource.DoelstellingLeaf_DOELSTELLINGID"
    )
    .join(
      "datasource",
      "doelstellingleaf_datasource.datasources_DATASOURCEID",
      "datasource.DATASOURCEID"
    )
    .where("adoelstelling.DTYPE", "DoelstellingLeaf");
};

/**
 * Find doelstelling with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = (name) => {
  return getKnex()(tables.doelstelling).where("NAME", name).first();
};
/**
 * Find doelstelling with the given `id`.
 *
 * @param {string} id - Id of the place to find.
 */
const findById = (id) => {
  return getKnex()(tables.doelstelling).where("DOELSTELLINGID", id).first();
};

/**
 * Find linked datasources with the given doelstelling `id`.
 *
 * @param {string} id - Id of the place to find.
 */
const findLinkedDatasourcesById = (id) => {
  return getKnex()(tables.doelstelling)
    .leftJoin(
      "doelstellingleaf_datasource as dd",
      "adoelstelling.DOELSTELLINGID",
      "dd.DoelstellingLeaf_DOELSTELLINGID"
    )
    .leftJoin(
      "datasource as da",
      "da.DATASOURCEID",
      "dd.datasources_DATASOURCEID"
    )
    .where("DOELSTELLINGID", id)
    .first();
};

module.exports = {
  findAll,
  findById,
  findByName,
  findLinkedDatasources,
  findLinkedDatasourcesById,
};
