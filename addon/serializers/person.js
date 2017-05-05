import DomainResourceSerializer from 'ember-fhir/serializers/domain-resource';

export default DomainResourceSerializer.extend({
  attrs: {
    identifier: { embedded: 'always' },
    name: { embedded: 'always' },
    telecom: { embedded: 'always' },
    address: { embedded: 'always' },
    photo: { embedded: 'always' },
    managingOrganization: { embedded: 'always' },
    link: { embedded: 'always' }
  }
});