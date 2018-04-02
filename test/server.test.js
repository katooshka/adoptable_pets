let assert = require('assert');
let should = require('should');
let server = require('../server.js');

let chai = require('chai');  
let expect = chai.expect;

describe('DB query', () => {
  it('should not filter by animalName when client query does not contain the name field', () => {
    expect(server.formDbQuery({}).animalName).to.be.undefined;
  });
  it('should not include isDead field when query.showDeadAnimals field is true', function() {
    expect(server.formDbQuery({showDeadAnimals: 'true'}).isDead).to.be.undefined;
  }); 
  it('should include isDead field when query.showDeadAnimals field is false', function() {
    expect(server.formDbQuery({showDeadAnimals: 'false'}).isDead).to.equal('FALSE');
  });
  it('should have one field if no name, color, breed or gender is provided', function() {
    expect(server.formDbQuery({})).to.deep.equal({isDead: 'FALSE'});
  });
  it('should filter by animalName when client query contains the name field', () => {
    expect(server.formDbQuery({animalName: 'Alba'})).to.deep.equal({isDead: 'FALSE', animalName: 'Alba'});
  });
  it('should have corresponding field when color, breed or gender is provided', function() {
    expect(server.formDbQuery({animalBreed: 'American Bulldog'})).to.deep.equal({isDead: 'FALSE', animalBreed: {$in: 'American Bulldog'}});
  });
});

