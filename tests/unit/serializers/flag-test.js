import { moduleForModel, test } from 'ember-qunit';

moduleForModel('flag', 'Unit | Serializer | Flag', {
  needs: [
    'serializer:flag',
    'model:identifier',
    'model:codeable-concept',
    'model:reference',
    'model:period',
    'model:meta',
    'model:narrative',
    'model:resource',
    'model:extension'
  ]
});

test('it serializes records', function(assert) {
  const record = this.subject(),
    serializeRecord = record.serialize();

  assert.ok(serializeRecord);
});