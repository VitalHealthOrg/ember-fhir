import { moduleForModel, test } from 'ember-qunit';

moduleForModel('schedule', 'Unit | Serializer | Schedule', {
  needs: [
    'serializer:schedule',
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