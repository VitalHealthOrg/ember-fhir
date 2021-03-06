import BackboneElementSerializer from 'ember-fhir/serializers/backbone-element';

export default BackboneElementSerializer.extend({
  attrs: {
    code: { embedded: 'always' },
    request: { embedded: 'always' },
    response: { embedded: 'always' }
  }
});