const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.template);
};
const findById = (id) => {
  return getKnex()(tables.template).where("ID", id).first();
};

const findLinkedCategoriesByID = (id) => {
  return getKnex()(tables.categorie)
  .whereNotIn('categorie.NAME', getKnex()(tables.template).select('c.NAME').join(
    "template_categorie as tc",
    "template.ID",
    "tc.template_ID"
  )
  .join(
    "categorie as c",
    "c.CATEGORIEID",
    "tc.categorie_ID"
  ).where("template.ID", id));
};

const updateById = async (id, {role, template, categorieIDs}) => {
    try {
      await getKnex()(tables.template)
        .update({role, template: JSON.stringify(template)})
        .where('id', id);
        console.log(categorieIDs);
        const fieldsToInsert = categorieIDs.map(ID => 
          ({ template_ID: id, categorie_ID: ID }));
          console.log(fieldsToInsert);
          await getKnex()(tables.template_categorie).where("template_ID", id).del();
        await getKnex()(tables.template_categorie).insert(fieldsToInsert)
        .then(() => { /* handle success */ })
        .catch(() => { /* handle failure */});
      return await findById(id);
    } catch (error) {
      const logger = getChildLogger('users-repo');
      logger.error('Error in updateById', {
        error,
      });
      throw error;
    }
  };

module.exports = {
    findAll,
    findById,
    updateById,
    findLinkedCategoriesByID,
};
