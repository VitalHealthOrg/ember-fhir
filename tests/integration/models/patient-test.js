// import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Pretender from 'pretender';
import { example as patient } from '../../stubs/patient';
import { example as organization } from '../../stubs/organization';
import Patient from 'ember-fhir/models/patient';

const requests = {
  '/Patient/example': function() {
    return [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(patient)
    ];
  },
  'http://vonk.fire.ly/Organization/1': function() {
    return [200, { 'Content-Type': 'application/json' }, JSON.stringify(organization)]
  }
};

let server;

module('Integration | Model | Patient', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    server = new Pretender(function() {
      Object.keys(requests).forEach(key => {
        this.get(key, requests[key]);
      });
    });
  });

  hooks.afterEach(function() {
    server.shutdown();
  });

  // // lookup the relationship on the user model
  // const relationship = get(User, 'relationshipsByName').get('profile');

  // assert.equal(relationship.key, 'profile', 'has relationship with profile');
  // assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  module('normalize', function() {
    let model;
    hooks.beforeEach(function() {
      return this.owner
        .lookup('service:store')
        .findRecord('Patient', 'example')
        .then(data => (model = data));
    });

    test('it normalizes `Patient` data to data model', function(assert) {
      assert.ok(model instanceof Patient);
      assert.equal(model.id, 'example');
      assert.equal(model.name.firstObject.use, 'official');
      assert.equal(model.name.firstObject.family, 'Chalmers');
      assert.deepEqual(model.name.firstObject.given, ['Peter', 'James']);
      
      assert.equal(model.active, true);
      assert.equal(model.gender, 'male');
      assert.deepEqual(model.birthDate.getDate(), 25),
      assert.equal(model.deceasedBoolean, false);
      assert.equal(model.deceasedDateTime, null);
      assert.equal(model.multipleBirthBoolean, null);
      assert.equal(model.multipleBirthInteger, null);
    });

    test('it creates expected relation-ships for `patient` model', function(assert) {
      const relationShip = model.relationshipFor('telecom');
      assert.equal(relationShip.kind, 'hasMany');
      assert.equal(relationShip.key, 'telecom');
      assert.equal(relationShip.type, 'contact-point');
    });
  });
});
