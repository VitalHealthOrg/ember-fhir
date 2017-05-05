import { moduleForModel, test } from 'ember-qunit';

moduleForModel('explanation-of-benefit-diagnosis', 'Unit | Model | ExplanationOfBenefit_Diagnosis', {
  needs: [
    'model:meta',
    'model:narrative',
    'model:resource',
    'model:extension',
    'model:codeable-concept',
    'model:reference'
  ]
});

test('it exists', function(assert) {
  const model = this.subject();
  assert.ok(!!model);
});