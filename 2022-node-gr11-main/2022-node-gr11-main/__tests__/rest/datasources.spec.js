const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  datasources: [
    { DATASOURCEID: 1, NAME: "Afval Reductie" },
    { DATASOURCEID: 2, NAME: "Waterverbruik" },
    { DATASOURCEID: 3, NAME: "Uitstoot" },
    { DATASOURCEID: 4, NAME: "Houtafval" },
    { DATASOURCEID: 5, NAME: "Energieverbruik" },
    { DATASOURCEID: 6, NAME: "Gasverbruik" }
  ],
};

const dataToDelete = {
  datasources: [1, 2, 3, 4, 5, 6]
};

describe('datasources', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/datasources";

  //GET
  describe('GET /api/datasources', () => {
    beforeAll(async () => {
      await knex(tables.datasource).insert(data.datasources);
    });

    afterAll(async () => {
      await knex(tables.datasource)
        .whereIn("DATASOURCEID", dataToDelete.datasources)
        .delete();
    });

    it("should 200 and return all datasources", async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(4);
    });
  });
  
  //GET
  describe('GET /api/datasources/:id', () => {
    beforeAll(async () => {
      await knex(tables.datasource).insert(data.datasources[3]);
    });

    afterAll(async () => {
      await knex(tables.datasource)
        .where("DATASOURCEID", dataToDelete.datasources[3])
        .delete();
    });
    
    it("should 200 and return the requested datasource", async () => {
      const datasourceId = data.datasources[3].DATASOURCEID;
      const response = await request.get(`${url}/${datasourceId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        DATASOURCEID: 4,
        NAME: "Houtafval",
      });
    });
  });
});

