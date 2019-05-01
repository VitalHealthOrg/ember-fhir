// import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Pretender from 'pretender';
import { example } from '../../stubs/questionnaire';
import Questionnaire from 'ember-fhir/models/questionnaire';

const requests = {
  '/Questionnaire': function() {
    return [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(example)
    ];
  }
};

let server;

module('Integration | Model | Bundle', function(hooks) {
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

  module('normalize', function() {
    let model;
    hooks.beforeEach(function() {
      return this.owner
        .lookup('service:store')
        .findAll('Questionnaire')
        .then(data => model = data);
    });

    test('it normalizes `Bundle` to model', function(assert) {
      assert.equal(model.modelName, 'questionnaire');
      assert.equal(model.length, 2);
      // assert.deepEqual(model.link.firstObject, {
      //   relation: 'self',
      //   url: 'http://hapi.fhir.org/baseDstu3/Questionnaire?_pretty=true'
      // });
      const entry = model.firstObject;
      assert.ok(entry instanceof Questionnaire);
      assert.equal(entry.url, 'http://hapi.fhir.org/baseDstu3/Questionnaire/cf-1530786012384');

      const relationShip = entry.relationshipFor('identifier');
      assert.equal(relationShip.kind, 'hasMany');
      assert.equal(relationShip.key, 'identifier');
      assert.equal(relationShip.type, 'identifier');
    });
  });
});
