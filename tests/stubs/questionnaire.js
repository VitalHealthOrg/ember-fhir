export const example = {
  resourceType: 'Bundle',
  id: 'cf-1531101177536',
  type: 'searchset',
  total: '2',
  link: [
    {
      relation: 'self',
      url: 'http://hapi.fhir.org/baseDstu3/Questionnaire?_pretty=true'
    },
    {
      relation: 'next',
      url:
        'http://hapi.fhir.org/baseDstu3?_getpages=cf-1531101177536&_getpagesoffset=20&_count=20&_pretty=true&_bundletype=searchset'
    }
  ],
  entry: [
    {
      fullUrl: 'http://hapi.fhir.org/baseDstu3/Questionnaire/cf-1530786012384',
      resource: {
        resourceType: 'Questionnaire',
        id: 'cf-1530786012384',
        text: {
          status: 'generated',
          div:
            "<div xmlns='http://www.w3.org/1999/xhtml'>Demographics Questionnaire<a name='mm'/></div>"
        },
        contained: [
          {
            resourceType: 'ValueSet',
            id: 'gender',
            identifier: [
              {
                system: 'http://hl7.org',
                value: 'http://hl7.org/fhir/administrative-gender'
              }
            ],
            name: 'Administrative Gender',
            status: 'active',
            description: 'Gender',
            compose: {
              include: [
                {
                  system: 'http://hl7.org',
                  concept: [
                    {
                      code: 'male',
                      display: 'male'
                    },
                    {
                      code: 'female',
                      display: 'female'
                    },
                    {
                      code: 'other',
                      display: 'Other'
                    },
                    {
                      code: 'unknown',
                      display: 'Unknown'
                    }
                  ]
                }
              ]
            }
          }
        ],
        url: 'http://hapi.fhir.org/baseDstu3/Questionnaire/cf-1530786012384',
        identifier: [
          {
            value: 'awh-questionnaire-demographics'
          }
        ],
        version: '0.0.1',
        name: 'Demographics Questionnaire',
        title: 'Demographics Questionnaire',
        status: 'active',
        experimental: false,
        date: '2018-07-03',
        publisher: 'Allied World Healthcare',
        description: 'Questionnaire for Person Demographics',
        purpose: 'Questionnaire for Person Demographics',
        approvalDate: '2018-07-03',
        lastReviewDate: '2018-07-03',
        effectivePeriod: {
          start: '2018-07-03',
          end: '2019-07-03'
        },
        copyright: 'Creative Commons',
        subjectType: ['Patient', 'Person', 'RelatedPerson'],
        item: [
          {
            linkId: '0',
            text: 'name',
            type: 'group',
            item: [
              {
                linkId: '0.1',
                text: 'official',
                type: 'string',
                required: false,
                maxLength: '20',
                initialString: 'official'
              },
              {
                linkId: '0.2',
                text: 'family',
                type: 'string',
                required: true,
                maxLength: '20'
              },
              {
                linkId: '0.3',
                text: 'given',
                type: 'string',
                required: true,
                maxLength: '20'
              }
            ]
          },
          {
            linkId: '1',
            text: 'telecom',
            type: 'group',
            item: [
              {
                linkId: '1.1',
                text: 'system',
                type: 'string',
                required: false,
                readOnly: true,
                maxLength: '20',
                initialString: 'phone'
              },
              {
                linkId: '1.2',
                text: 'value',
                type: 'string',
                required: false,
                maxLength: '20'
              },
              {
                linkId: '1.3',
                text: 'use',
                type: 'string',
                required: false,
                readOnly: true,
                maxLength: '20',
                initialString: 'work'
              }
            ]
          },
          {
            linkId: '2',
            text: 'what is your gender',
            type: 'choice',
            required: true,
            options: {
              reference: '#gender'
            }
          },
          {
            linkId: '3',
            text: 'birthDate',
            type: 'date',
            required: false
          },
          {
            linkId: '4',
            text: 'active',
            type: 'boolean',
            required: false
          },
          {
            linkId: '5',
            text: 'address',
            type: 'group',
            item: [
              {
                linkId: '5.1',
                text: 'use',
                type: 'string',
                required: false,
                readOnly: true,
                maxLength: '20',
                initialString: 'home'
              },
              {
                linkId: '5.2',
                text: 'line',
                type: 'string',
                required: false,
                maxLength: '20'
              },
              {
                linkId: '5.3',
                text: 'city',
                type: 'string',
                required: false,
                maxLength: '20'
              },
              {
                linkId: '5.4',
                text: 'state',
                type: 'string',
                required: false,
                maxLength: '20'
              },
              {
                linkId: '5.5',
                text: 'postalCode',
                type: 'integer',
                required: false,
                maxLength: '20'
              }
            ]
          },
          {
            linkId: '6',
            text: 'link',
            type: 'group',
            item: [
              {
                linkId: '6.1',
                text: 'target',
                type: 'group',
                item: [
                  {
                    linkId: '6.1.1',
                    text: 'Person',
                    type: 'reference'
                  },
                  {
                    linkId: '6.1.2',
                    text: 'display',
                    type: 'string',
                    required: false,
                    maxLength: '20'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      fullUrl: 'http://hapi.fhir.org/baseDstu3/Questionnaire/cf-1531101158261',
      resource: {
        resourceType: 'Questionnaire',
        id: 'cf-1531101158261',
        text: {
          status: 'generated',
          div:
            "<div xmlns='http://www.w3.org/1999/xhtml'>Maternal and Child Questions<a name='mm'/></div>"
        },
        contained: [
          {
            resourceType: 'ValueSet',
            id: 'reference-contained-options',
            identifier: [
              {
                system: 'http://hl7.org',
                value: 'http://hl7.org/fhir/administrative-gender'
              }
            ],
            name: 'Administrative Gender',
            status: 'active',
            description: 'Gender',
            compose: {
              include: [
                {
                  system: 'http://hl7.org',
                  concept: [
                    {
                      code: 'option 1',
                      display: 'option 1'
                    },
                    {
                      code: 'option 2',
                      display: 'option 2'
                    }
                  ]
                }
              ]
            }
          }
        ],
        url: 'http://hapi.fhir.org/baseDstu3/Questionnaire/cf-1531101158261',
        identifier: [
          {
            value: 'awh-questionnaire-maternalandchild'
          }
        ],
        version: '0.0.1',
        name: 'Maternal and Child Questionnaire',
        title: 'Maternal and Child Questionnaire',
        status: 'active',
        experimental: false,
        date: '2018-07-03',
        publisher: 'Allied World Healthcare',
        description: 'Questionnaire for  Maternal and Child',
        purpose: 'Questionnaire for Maternal and Child',
        approvalDate: '2018-07-03',
        lastReviewDate: '2018-07-03',
        effectivePeriod: {
          start: '2018-07-03',
          end: '2019-07-03'
        },
        copyright: 'Creative Commons',
        subjectType: ['Patient', 'Person', 'RelatedPerson'],
        item: [
          {
            linkId: '110',
            prefix: 'a.',
            text: 'This is the generic meta-data of an item?',
            type: 'string',
            required: false,
            repeats: false,
            readOnly: false,
            maxLength: '20',
            initialString: 'default value'
          },
          {
            linkId: '11',
            text: 'This is a question with integer answer?',
            type: 'integer',
            required: true
          },
          {
            linkId: '12',
            text: 'This is a question with a default integer answer?',
            type: 'integer',
            required: true,
            initialInteger: '1'
          },
          {
            linkId: '13',
            text: 'This is a question with decimal answer?',
            type: 'decimal',
            required: true
          },
          {
            linkId: '14',
            text: 'This is a question with a default decimal answer?',
            type: 'decimal',
            required: true,
            initialDecimal: '1.01'
          },
          {
            linkId: '10',
            text: 'This is a question with string answer?',
            type: 'string',
            required: true,
            readOnly: false,
            maxLength: '20'
          },
          {
            linkId: '20',
            text: 'This is a question with default string value?',
            type: 'string',
            required: false,
            maxLength: '20',
            initialString: 'this is a default string value'
          },
          {
            linkId: '60',
            text: 'This is a question with boolean answer?',
            type: 'boolean',
            required: false
          },
          {
            linkId: '23',
            text: 'This is a question with default boolean value?',
            type: 'string',
            required: false,
            maxLength: '10',
            initialBoolean: true
          },
          {
            linkId: '50',
            text: 'This is a question with birthdate answer?',
            type: 'date',
            required: false
          },
          {
            linkId: '0',
            text: 'This is a question with grouping?',
            type: 'group',
            item: [
              {
                linkId: '0.1',
                text: 'this is a 1st question within a group?',
                type: 'string',
                required: false,
                maxLength: '20',
                initialString: 'official'
              },
              {
                linkId: '0.2',
                text: 'this is a 2nd question within a group?',
                type: 'string',
                required: true,
                maxLength: '20'
              }
            ]
          },
          {
            linkId: '210',
            text:
              'This is a multiple question (radio button) with external referenced options?',
            type: 'open-choice',
            options: {
              reference: 'http://hl7.org/fhir/ValueSet/administrative-gender'
            }
          },
          {
            linkId: '21',
            text:
              'This is a multiple question (checkbox) with external referenced options?',
            type: 'choice',
            options: {
              reference: 'http://hl7.org/fhir/ValueSet/administrative-gender'
            }
          },
          {
            linkId: '40',
            text:
              'This is a multiple question (radio botton) with contained referenced options?',
            type: 'choice',
            options: {
              reference: '#reference-contained-options'
            }
          },
          {
            linkId: '41',
            text:
              'This is a multiple question (radio botton) with embedded options?',
            type: 'choice',
            option: [
              {
                valueCoding: {
                  system: 'http://hl7.org',
                  code: 'option 1',
                  display: 'option 1'
                }
              },
              {
                valueCoding: {
                  system: 'http://hl7.org',
                  code: 'option 2',
                  display: 'option 2'
                }
              }
            ]
          },
          {
            linkId: '22',
            text:
              'This is a string question with dependency to the embedded options value?',
            type: 'string',
            enableWhen: [
              {
                question: '41',
                answerCoding: {
                  system: 'http://hl7.org',
                  code: 'option 2',
                  display: 'option 2'
                }
              }
            ],
            required: false,
            maxLength: '20'
          },
          {
            linkId: '24',
            text:
              'This is a string question with dependency to string question?',
            type: 'string',
            enableWhen: [
              {
                question: '10',
                hasAnswer: true
              }
            ],
            required: false,
            maxLength: '20'
          },
          {
            linkId: '240',
            text:
              'This is a string question with dependency to boolean question?',
            type: 'string',
            enableWhen: [
              {
                question: '60',
                hasAnswer: true
              }
            ],
            required: false,
            maxLength: '20'
          },
          {
            linkId: '25',
            text:
              'This is a multiple question (radio button) with dependency  to the embedded options value?',
            type: 'choice',
            enableWhen: [
              {
                question: '41',
                answerCoding: {
                  system: 'http://hl7.org',
                  code: 'option 2',
                  display: 'option 2'
                }
              }
            ],
            options: {
              reference: '#reference-contained-options'
            }
          }
        ]
      }
    }
  ]
};
