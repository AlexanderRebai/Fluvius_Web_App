const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  categories: [
    { CATEGORIEID: 1, NAME: "Nutsvoorzieningen" },
    { CATEGORIEID: 2, NAME: "Omgeving" },
    { CATEGORIEID: 3, NAME: "Groene energie" },
    { CATEGORIEID: 4, NAME: "Financien" }
  ],
};

const dataToDelete = {
  categories: [1, 2, 3, 4]
};

describe('categories', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/categories";

  //GET
  describe('GET /api/categories', () => {
    beforeAll(async () => {
      await knex(tables.categorie).insert(data.categories);
    });

    afterAll(async () => {
      await knex(tables.categorie)
        .whereIn("CATEGORIEID", dataToDelete.categories)
        .delete();
    });

    it("should 200 and return all categories", async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(4);
    });
  });
  
  //GET
  describe('GET /api/categories/:id', () => {
    beforeAll(async () => {
      await knex(tables.categorie).insert(data.categories[1]);
    });

    afterAll(async () => {
      await knex(tables.categorie)
        .where("CATEGORIEID", dataToDelete.categories[1])
        .delete();
    });
    
    it("should 200 and return the requested categorie", async () => {
      const categorieId = data.categories[1].CATEGORIEID;
      const response = await request.get(`${url}/${categorieId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        CATEGORIEID: 2,
        NAME: "Omgeving",
      });
    });
  });
});

