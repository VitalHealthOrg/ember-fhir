# Ember-fhir

Ember FHIR adapter designed for simple and direct interraction with FHIR servers straight from the Ember front end.

Includes models and serializers for all resources in FHIR DSTU3. For DSTU2 please see
[Ember-fhir-adapter](https://github.com/intervention-engine/ember-fhir-adapter)

## Demo/Usage

[Demo](http://demo.ember-fhir.com)

## Installation
* `ember install ember-fhir`

This will add ember-fhir as a dependency in your package.json

## Reserved keywords

Due to some collision with ember reserved words, e.g data, type etc., the following elements are mapped to `element_`. Future versions of this addon may change this behavior.

| Element | Mapping |
| --- | --- |
| container | container_ |
| data | data_ |
| trigger | trigger_ |
| type | type_ |


## Resolving references

This library is trying to resolve [FHIR References](http://hl7.org/fhir/STU3/references.html) by mapping references to [Ember Data References](https://api.emberjs.com/ember-data/3.9/classes/DS.Reference). 
Only [literal reference](http://hl7.org/fhir/STU3/references.html#literal) are supported which could be a `Relative`, `internal` or `absolute` URL.

We try to resolve all references using the provided URL (which should be resolveable) and currently do not make a distinction between absolute or [canonical](http://hl7.org/fhir/STU3/references.html#canonical) URLs as it is not likely that canonical URls (mostly used by "conformance" or "knowledge: resources) are browsed by a client.

> References SHALL be a reference to an actual FHIR resource, and SHALL be resolveable (allowing for access control, temporary unavailability, etc). Resolution can be either by retrieval from the URL, or, where applicable by resource type, by treating an absolute reference as a canonical URL (see below) and looking it up in a local registry/repository

Examples:
- Relative URL
  ```XML
  <patient>
    <reference value="Patient/034AB16" />
  </patient>
  ```
- Absolute URL
  ```XML
  <profile>
    <reference value="http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b" />
  </profile>
  ```
- Internal "contained" reference: http://hl7.org/fhir/STU3/references.html#contained (NOT SUPPORTED YET)
  ```XML
  <Condition xmlns="http://hl7.org/fhir">
    <contained>
      <Practitioner>
        <id value="p1"/>
        <name>
          <family value="Person"/>
          <given value="Patricia"/>
        </name>
      </Practitioner>
    </contained>
    <!-- other attributes -->
    <asserter>
      <reference value="#p1" />
    </asserter>
    <!-- other attributes -->
 </Condition>
 ```

## Contributing

Feel free to fork this repository and issue PR's

## Resources

* [HL7 FHIR](http://hl7.org/fhir/)
* [FHIR DSTU3 Resources](http://hl7.org/fhir/resourcelist.html)
