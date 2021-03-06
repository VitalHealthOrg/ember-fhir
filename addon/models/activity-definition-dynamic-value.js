import DS from 'ember-data';
import BackboneElement from 'ember-fhir/models/backbone-element';

const { attr } = DS;

export default BackboneElement.extend({
  description: attr('string'),
  path: attr('string'),
  language: attr('string'),
  expression: attr('string')
});