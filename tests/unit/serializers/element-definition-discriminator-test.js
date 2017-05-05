import { moduleForModel, test } from 'ember-qunit';

moduleForModel('element-definition-discriminator', 'Unit | Serializer | ElementDefinition_Discriminator', {
  needs: [
    'serializer:element-definition-discriminator',
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