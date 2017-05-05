import DS from 'ember-data';
import BackboneElement from 'ember-fhir/models/backbone-element';

const { attr, belongsTo } = DS;

export default BackboneElement.extend({
  identifier: belongsTo('identifier', { async: false }),
  criteria: attr('string'),
  path: attr('string')
});