const chai = require('chai');
const expect = require('../src');

const req = {
  params: {
    name: 'Mikhail Semin',
    age: 16,
    city: {
      id: 2,
      title: 'Saint Petersburg',
    },
  },
};

describe('expect', () => {
  it('should throw error', () => {
    const middleware = expect({
      name: String,
      age: Number,
      city: {
        type: Object,
        validate: value => value.id > 10,
      },
    });

    try {
      middleware(req, {}, () => {});
    } catch ({ status, message }) {
      chai.expect(status).to.be.equal(400);
      chai.expect(message).to.be.equal('city is invalid');
    }
  });

  it('should not throw error', (done) => {
    const middleware = expect({
      name: String,
      age: Number,
      city: Object,
    });

    middleware(req, {}, done);
  });
});
