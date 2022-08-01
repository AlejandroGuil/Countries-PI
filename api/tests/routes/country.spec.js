/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  "id": "PLJ",
  "name": "PAISLEJANO",
  "img": "https://m.facebook.com/photo.php?fbid=448312343966528&id=100063632976943&set=a.448312293966533&source=11&refid=17",
  "region" : "Lejana",
  "capital": "Desconocida",
  "subregion": "Oscura",
  "area": 23456,
  "population": 90
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  

  describe('GET /countries', () => {

    xit('Get /countries', function (done) {
      const res = agent.get('/countries')
        .expect(200, done)
    });
    
    xit('Devuelva un array de 250 de largo', function (done) {
      
      agent
        .get('/countries')
        .expect('Content-type', /json/)
        .expect(function (res) {
          expect(res.body).to.have.lengthOf(250)
        })
        .expect(200, done) 
    })
    
    xit('Si se le pasa un nombre válido por query, devuelva un array de 1 de largo, y un status 200' , function (done) {
      
      agent
        .get('/countries')
        .query({
          name: 'arg'
        })
        .expect('Content-type', /json/)
        .expect(function (res) {
          expect(res.body).to.have.lengthOf(1)
        })
        .expect(200, done) 
    })

    
    xit('Si se le pasa un nombre inválido (aaaa) por query, devuelva el error "No se encuentra el pais aaaa" y un status 404', function (done) {
      
      agent
        .get('/countries')
        .query({
          name: 'aaaa'
        })
        
        .expect(function (res) {
          expect(res.text).to.equal('No se encuentra el pais aaaa')
        })
        .expect(404, done) 
    })

    xit('Si recive id por params, debe returnar el país correcto', async () => {
      await agent.get('/countries')
      const res = await agent.get('/countries/ARG');
      expect(200);
      expect(res.body).to.have.property("id", "ARG")
      expect(res.body).to.have.property("name", "Argentina")
       
    })
  
  });

});
 



