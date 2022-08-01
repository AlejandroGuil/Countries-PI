const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

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

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));


  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      xit('Devuelve error si no se proporcionan datos', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      xit('Si no se pone id devuelve error', () => {
        Country.create({ name: 'Argentina' })
        .then(() => done(new Error('Country.id cannot be null')))
        .catch(() => done());
      });
      xit('Si se crea correctamente debe contener propiedades y valores correctos', async () => {
        const pais = await Country.create(country);
        expect(pais.toJSON()).to.have.property('name');
        expect(pais.toJSON()).to.have.property('id');
        expect(pais.toJSON()).to.have.property('area');
      });
      xit('Devuelve error si el pais ya esxiste en la bd', async () => {
        Country.create(country)
        .then(()=>{
          Country.create(country)
          .then(() => done(new Error("Ya existe la llave (id)=(PLJ).")))
          .catch(() => done());
        })

      

      });
      xit('Al crear un pais devuelva un objeto del mismo', async () => {
        const pais = await Country.create(country)
        expect(pais).to.be.a('object')
        
      });
      xit('Si se crea dos veces el mismo Country devuelve el error "llave duplicada viola restricción de unicidad «Countries_pkey»"', async () => {
         try {
           await Country.create(country);
           await Country.create(country)
        } catch (error) {
          expect(error.message).to.equal('llave duplicada viola restricción de unicidad «Countries_pkey»',);
          return;
        }
      });
      xit('Si no se indica capital devuelve el error "notNull Violation: Country.capital cannot be null " ', async () => {
        try {
          await Country.create({...country, capital:undefined});
       } catch (error) {
         expect(error.message).to.equal('notNull Violation: Country.capital cannot be null',);
         return;
       }
     });
    });
  });
});