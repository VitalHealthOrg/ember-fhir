import DS from 'ember-data';
import BackboneElement from 'ember-fhir/models/backbone-element';

const { attr, belongsTo } = DS;

export default BackboneElement.extend({
  language: attr('string'),
  use: belongsTo('coding', { async: false }),
  value: attr('string')
});