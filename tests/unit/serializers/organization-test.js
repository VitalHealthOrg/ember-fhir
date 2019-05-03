import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { example as organization } from '../../stubs/organization';
import Organization from 'ember-fhir/models/organization';
import { run } from '@ember/runloop';

module('Unit | Serializer | Organization', function(hooks) {
  setupTest(hooks);

  test('it serializes records', function(assert) {
    const record = run(() => this.owner.lookup('service:store').createRecord('organization')),
      serializeRecord = record.serialize();

    assert.ok(serializeRecord);
  });
  
  module('normalize', function() {
    let store, serializer;
    hooks.beforeEach(function() {
      store = this.owner.lookup('service:store');
      serializer = store.serializerFor('Reference');
    });

    test('belongsTo reference should normalize with model in returned payload', async function(assert) {
      const resultDocument = serializer.normalizeResponse(
        store,
        Organization,
        organization,
        null,
        'findBelongsTo'
      );

      assert.propEqual(resultDocument.data.attributes, {
        active: true,
        name: 'Laboratoire de charme'
      });
      assert.equal(resultDocument.data.type, 'organization');
      assert.equal(resultDocument.data.id, '1');
      assert.equal(resultDocument.data.relationships.meta.data.type, 'meta')
      assert.equal(resultDocument.data.relationships.type_.data[0].type, 'codeable-concept')
      assert.deepEqual(resultDocument.included.map(item => item.type), ['codeable-concept', 'coding', 'meta']);
      assert.deepEqual(resultDocument.meta, {});
    });
  });
});