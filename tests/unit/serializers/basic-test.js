import { moduleForModel, test } from 'ember-qunit';

moduleForModel('basic', 'Unit | Serializer | Basic', {
  needs: [
    'serializer:basic',
    'model:identifier',
    'model:codeable-concept',
    'model:reference',
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