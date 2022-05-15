const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  doelstellingen: [
    { DOELSTELLINGID: 1, NAME: "Afval" },
    { DOELSTELLINGID: 2, NAME: "Houtafval" },
    { DOELSTELLINGID: 3, NAME: "Gasverbruik" },
    { DOELSTELLINGID: 4, NAME: "Energieverbruik" },
    { DOELSTELLINGID: 5, NAME: "Uitstoot" }
  ],
};

const dataToDelete = {
  doelstellingen: [1, 2, 3, 4, 5]
};

describe('doelstellingen', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/doelstellingen";

  //GET
  describe('GET /api/doelstellingen', () => {
    beforeAll(async () => {
      await knex(tables.doelstelling).insert(data.doelstellingen);
    });

    afterAll(async () => {
      await knex(tables.doelstelling)
        .whereIn("DOELSTELLINGID", dataToDelete.doelstellingen)
        .delete();
    });

    it("should 200 and return all doelstellingen", async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(5);
    });
  });
  
  //GET
  describe('GET /api/doelstellingen/:id', () => {
    beforeAll(async () => {
      await knex(tables.doelstelling).insert(data.doelstellingen[2]);
    });

    afterAll(async () => {
      await knex(tables.doelstelling)
        .where("DOELSTELLINGID", dataToDelete.doelstellingen[2])
        .delete();
    });
    
    it("should 200 and return the requested doelstelling", async () => {
      const doelstellingId = data.doelstellingen[2].DOELSTELLINGID;
      const response = await request.get(`${url}/${doelstellingId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        DOELSTELLINGID: 3,
        NAME: "Gasverbruik",
      });
    });
  });
});

