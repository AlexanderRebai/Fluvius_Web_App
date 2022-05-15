const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.categorie);
};

const findLinkedDoelstellingen = () => {
  return getKnex()(tables.categorie)
    .join(
      "categorie_adoelstelling as ca",
      "categorie.CATEGORIEID",
      "ca.Categorie_CATEGORIEID"
    )
    .join(
      "adoelstelling as ad",
      "ad.DOELSTELLINGID",
      "ca.doelstellingen_DOELSTELLINGID"
    );
};

/**
 * Find categorie with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = (name) => {
  return getKnex()(tables.categorie).where("NAME", name).first();
};
/**
 * Find categorie with the given `id`.
 *
 * @param {string} id - Id of the place to find.
 */
const findById = (id) => {
  return getKnex()(tables.categorie).where("CATEGORIEID", id).first();
};

const findLinkedDoelstellingenByID = (id) => {
  return getKnex()(tables.categorie)
    .join(
      "categorie_adoelstelling as ca",
      "categorie.CATEGORIEID",
      "ca.Categorie_CATEGORIEID"
    )
    .join(
      "adoelstelling as ad",
      "ad.DOELSTELLINGID",
      "ca.doelstellingen_DOELSTELLINGID"
    )
    .where("CATEGORIEID", id);
};

const findAllWithDoelstellingen = () => {
  return getKnex()(tables.categorie)
    .select("categorie.*", "ad.NAME as doelstellingName")
    .leftJoin(
      "categorie_adoelstelling as ca",
      "categorie.CATEGORIEID",
      "ca.Categorie_CATEGORIEID"
    )
    .leftJoin(
      "adoelstelling as ad",
      "ad.DOELSTELLINGID",
      "ca.doelstellingen_DOELSTELLINGID"
    );
};

module.exports = {
  findAll,
  findById,
  findByName,
  findLinkedDoelstellingen,
  findLinkedDoelstellingenByID,
  findAllWithDoelstellingen,
};
