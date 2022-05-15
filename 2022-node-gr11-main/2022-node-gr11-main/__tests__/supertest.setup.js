const supertest = require('supertest');
const createServer = require('../src/createServer');
const { getKnex } = require('../src/data');

module.exports.withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

/*
module.exports.login = async (supertest) => {
  const response = await supertest.post('/api/users/login').send({
    email: 'testuser@student.hogent.be',
    password: '12345678'
  });

  if(response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};

module.exports.loginAdmin = async (supertest) => {
  const response = await supertest.post('/api/users/login').send({
    email: 'admin.testuser@student.hogent.be',
    password: '12345678'
  });

  if(response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`;
};
*/
