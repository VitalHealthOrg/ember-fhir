import BackboneElementSerializer from 'ember-fhir/serializers/backbone-element';

export default BackboneElementSerializer.extend({
  attrs: {
    valueSetReference: { embedded: 'always' },
    valueCoding: { embedded: 'always' },
    valueCodeableConcept: { embedded: 'always' }
  }
});