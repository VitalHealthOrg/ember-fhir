import ElementSerializer from 'ember-fhir/serializers/element';

export default ElementSerializer.extend({
  attrs: {profile: { embedded: 'always' }
  }
});