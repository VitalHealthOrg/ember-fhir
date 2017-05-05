import { moduleForModel, test } from 'ember-qunit';

moduleForModel('imaging-manifest-study', 'Unit | Serializer | ImagingManifest_Study', {
  needs: [
    'serializer:imaging-manifest-study',
    'model:reference',
    'model:imaging-manifest-series',
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