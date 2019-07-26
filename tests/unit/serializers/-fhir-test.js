import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { example } from '../../stubs/patient';
import { example as questionnaire } from '../../stubs/questionnaire';
import { example as patient } from '../../stubs/patient';
import { example as specimen } from '../../stubs/specimen';
import Questionnaire from 'ember-fhir/models/questionnaire';
import Patient from 'ember-fhir/models/patient';
import Specimen from 'ember-fhir/models/specimen';

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
    const record = run(() =>
      this.owner.lookup('service:store').createRecord('Element')
    );
    const serializeRecord = record.serialize();

    assert.ok(serializeRecord);
  });

  test('#pushPayload with FHIR data creates ember models', async function(assert) {
    const store = this.owner.lookup('service:store');
    store.pushPayload('patient', example);

    const record = store.peekRecord('patient', 'example');

    assert.ok(record instanceof Patient);
    assert.equal(record.id, 'example');
  });

  module('normalize to JSON-API document', function() {
    let store;
    hooks.beforeEach(function() {
      store = this.owner.lookup('service:store');
    });

    test('uses ResourceType as modelName', async function(assert) {
      const serializer = store.serializerFor('specimen');
      const resultDocument = serializer.normalizeResponse(
        store,
        Specimen,
        specimen,
        null,
        'findRecord'
      );

      //Attributes and sync relations should still work
      assert.equal(resultDocument.data.type, 'specimen');
      assert.equal(resultDocument.data.id, '1');
    });


    test('belongsTo references', async function(assert) {
      const serializer = store.serializerFor('Patient');
      const resultDocument = serializer.normalizeResponse(
        store,
        Patient,
        patient,
        null,
        'findRecord'
      );

      //Attributes and sync relations should still work
      assert.equal(resultDocument.data.id, 'example');
      assert.equal(resultDocument.data.type, 'patient');
      assert.equal(resultDocument.data.attributes.active, true);
      assert.ok(Array.isArray(resultDocument.included));
      assert.equal(resultDocument.included.length, 28);

      assert.equal(resultDocument.data.relationships.name.data.length, 3);
      assert.equal(
        resultDocument.data.relationships.name.data[0].type,
        'human-name'
      );
    });

    test('internal contained resources', async function(assert) {
      const serializer = store.serializerFor('Questionnaire');
      const resultDocument = serializer.normalizeResponse(
        store,
        Questionnaire,
        questionnaire,
        'cf-1531101177536',
        'query'
      );

      assert.ok(Array.isArray(resultDocument.data));
      assert.equal(resultDocument.data.length, 2);

      const firstObject = resultDocument.data[0];
      assert.equal(firstObject.id, 'cf-1530786012384');
      assert.equal(firstObject.type, 'questionnaire');
      assert.equal(firstObject.attributes.name, 'Demographics Questionnaire');
      assert.ok(firstObject.relationships.hasOwnProperty('identifier'));

      assert.ok(Array.isArray(resultDocument.included));
      assert.equal(resultDocument.included.length, 65);

      assert.deepEqual(resultDocument.meta, {
        pagination: {
          self: 'http://hapi.fhir.org/baseDstu3/Questionnaire?_pretty=true',
          next:
            'http://hapi.fhir.org/baseDstu3?_getpages=cf-1531101177536&_getpagesoffset=20&_count=20&_pretty=true&_bundletype=searchset'
        },
        total: '2'
      });
    });
  });
});
