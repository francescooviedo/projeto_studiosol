const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('1 - Validation request', function () {
    it('succesful', async function () {
       const output = { verify: true, noMatch: [] };
       const validBody = {
            password: 'TesteSenhaForte!1234&',
            rules: [
            { rule: 'minSize', value: 8 },
            { rule: 'minSpecialChars', value: 2 },
            { rule: 'noRepeted', value: 0 },
            { rule: 'minDigit', value: 4 },
            ],
        };
    const response = await chai
    .request(app)
    .post('/verify')
    .send(validBody);
  expect(response.status).to.be.equal(200);
  expect(response.body).to.deep.equal(output);
    });
    it('failure', async function () {
        const output = { message: 'please insert the correct rules' };
        const validBody = {
             password: 'TesteSenhaForte!1234&',
             rules: [
             { rule: 'minSize1', value: 8 },
             ],
         };
     const response = await chai
     .request(app)
     .post('/verify')
     .send(validBody);
   expect(response.status).to.be.equal(400);
   expect(response.body).to.deep.equal(output);
     });
});
