import { moduleForModel, test } from 'ember-qunit';

moduleForModel('nutrition-order-texture', 'Unit | Serializer | NutritionOrder_Texture', {
  needs: [
    'serializer:nutrition-order-texture',
    'model:codeable-concept',
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