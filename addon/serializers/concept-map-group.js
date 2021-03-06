import BackboneElementSerializer from 'ember-fhir/serializers/backbone-element';

export default BackboneElementSerializer.extend({
  attrs: { element: { embedded: 'always' }, unmapped: { embedded: 'always' }
  }
});