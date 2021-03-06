import { moduleForModel, test } from 'ember-qunit';

moduleForModel('plan-definition-related-action', 'Unit | Serializer | PlanDefinition_RelatedAction', {
  needs: [
    'serializer:plan-definition-related-action',
    'model:duration',
    'model:range',
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