import { moduleForModel, test } from 'ember-qunit';

moduleForModel('communication-request-requester', 'Unit | Model | CommunicationRequest_Requester', {
  needs: [
    'model:meta',
    'model:narrative',
    'model:resource',
    'model:extension',
    'model:reference'
  ]
});

test('it exists', function(assert) {
  const model = this.subject();
  assert.ok(!!model);
});