import { moduleForModel, test } from 'ember-qunit';

moduleForModel('test-report', 'Unit | Serializer | TestReport', {
  needs: [
    'serializer:test-report',
    'model:identifier',
    'model:reference',
    'model:test-report-participant',
    'model:test-report-setup',
    'model:test-report-test',
    'model:test-report-teardown',
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