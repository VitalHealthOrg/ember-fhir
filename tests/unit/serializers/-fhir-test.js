import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { example } from '../../stubs/patient';
import { example as bundle } from '../../stubs/questionnaire';
import Patient from 'ember-fhir/models/patient';
import Questionnaire from 'ember-fhir/models/questionnaire';

import Service from '@ember/service';

module('Unit | Serializer | -fhir', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    const storeStub = Service.extend({
      findRecord(value) {
        return Promise.resolve(value);
      }
    });

    this.owner.register('service:store', storeStub);
    this.store = this.owner.lookup('service:store');
    this.sut = run(() => this.store.createRecord('element'));
  });

  test('#serialize returns record', function(assert) {
    const record = run(() => this.owner.lookup('service:store').createRecord('Element'));
    const serializeRecord = record.serialize();

    assert.ok(serializeRecord);
  });

  test('#pushPayload with FHIR data creates ember models', async function (assert) {
    const store = this.owner.lookup('service:store');
    store.pushPayload('patient', example);

    const record = store.peekRecord('patient', 'example');

    assert.ok(record instanceof Patient);
    assert.equal(record.id, 'example');
  });

  module('normalize to JSON-API document', function() {
    let resultDocument;
    hooks.beforeEach(function() {
      const store = this.owner.lookup('service:store');
      const serializer = store.serializerFor('Questionnaire');

      resultDocument = serializer.normalizeResponse(store, Questionnaire, bundle, 'cf-1531101177536', 'query');  
    });

    // test('should match expected', async function (assert) {
    //   assert.propEqual(resultDocument, questionnaireJsonApiDocument);
    // });

    test('to `data` property', async function (assert) {
      assert.ok(Array.isArray(resultDocument.data));
      assert.equal(resultDocument.data.length, 2);

      const firstObject = resultDocument.data[0];
      assert.equal(firstObject.id, 'cf-1530786012384');
      assert.equal(firstObject.type, 'questionnaire');
      assert.equal(firstObject.attributes.name, 'Demographics Questionnaire');
      assert.ok(firstObject.relationships.hasOwnProperty('identifier'));
    });

    test('to `included` property', async function (assert) {
      assert.ok(Array.isArray(resultDocument.included));
      assert.equal(resultDocument.included.length, 65);
    });

    test('to `meta` property', async function (assert) {
      assert.deepEqual(resultDocument.meta, {
        "pagination": {
          "self": "http://hapi.fhir.org/baseDstu3/Questionnaire?_pretty=true",
          "next": "http://hapi.fhir.org/baseDstu3?_getpages=cf-1531101177536&_getpagesoffset=20&_count=20&_pretty=true&_bundletype=searchset"
        },
        "total": "2"
      })
    });
  });
});
