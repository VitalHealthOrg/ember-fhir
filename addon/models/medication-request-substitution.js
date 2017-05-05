import DS from 'ember-data';
import BackboneElement from 'ember-fhir/models/backbone-element';

const { attr, belongsTo } = DS;

export default BackboneElement.extend({
  allowed: attr('boolean', { allowNull: true }),
  reason: belongsTo('codeable-concept', { async: false })
});