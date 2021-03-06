import DS from 'ember-data';
import Element from 'ember-fhir/models/element';

const { attr, belongsTo } = DS;

export default Element.extend({
  url: attr('string'),
  valueBoolean: attr('boolean', { allowNull: true }),
  valueInteger: attr('number'),
  valueDecimal: attr('number'),
  valueBase64Binary: attr('string'),
  valueInstant: attr('string'),
  valueString: attr('string'),
  valueUri: attr('string'),
  valueDate: attr('date'),
  valueDateTime: attr('date'),
  valueTime: attr('date'),
  valueCode: attr('string'),
  valueOid: attr('string'),
  valueUuid: attr('string'),
  valueId: attr('string'),
  valueUnsignedInt: attr('number'),
  valuePositiveInt: attr('number'),
  valueMarkdown: attr('string'),
  valueElement: belongsTo('element', { async: false, inverse: 'extension' }),
  valueExtension: belongsTo('extension', { async: false, inverse: null }),
  valueBackboneElement: belongsTo('backbone-element', { async: false, inverse: null }),
  valueNarrative: belongsTo('narrative', { async: false }),
  valueAnnotation: belongsTo('annotation', { async: false }),
  valueAttachment: belongsTo('attachment', { async: false }),
  valueIdentifier: belongsTo('identifier', { async: false }),
  valueCodeableConcept: belongsTo('codeable-concept', { async: false }),
  valueCoding: belongsTo('coding', { async: false }),
  valueQuantity: belongsTo('quantity', { async: false }),
  valueDuration: belongsTo('duration', { async: false }),
  valueSimpleQuantity: belongsTo('quantity', { async: false }),
  valueDistance: belongsTo('distance', { async: false }),
  valueCount: belongsTo('count', { async: false }),
  valueMoney: belongsTo('money', { async: false }),
  valueAge: belongsTo('age', { async: false }),
  valueRange: belongsTo('range', { async: false }),
  valuePeriod: belongsTo('period', { async: false }),
  valueRatio: belongsTo('ratio', { async: false }),
  valueReference: belongsTo('reference', { async: false }),
  valueSampledData: belongsTo('sampled-data', { async: false }),
  valueSignature: belongsTo('signature', { async: false }),
  valueHumanName: belongsTo('human-name', { async: false }),
  valueAddress: belongsTo('address', { async: false }),
  valueContactPoint: belongsTo('contact-point', { async: false }),
  valueTiming: belongsTo('timing', { async: false }),
  valueMeta: belongsTo('meta', { async: false }),
  valueElementDefinition: belongsTo('element-definition', { async: false, inverse: null }),
  valueContactDetail: belongsTo('contact-detail', { async: false }),
  valueContributor: belongsTo('contributor', { async: false }),
  valueDosage: belongsTo('dosage', { async: false }),
  valueRelatedArtifact: belongsTo('related-artifact', { async: false }),
  valueUsageContext: belongsTo('usage-context', { async: false }),
  valueDataRequirement: belongsTo('data-requirement', { async: false }),
  valueParameterDefinition: belongsTo('parameter-definition', { async: false }),
  valueTriggerDefinition: belongsTo('trigger-definition', { async: false })
});