export const example = {
  resourceType: "Specimen",
  id: "1",
  type: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "87612001",
        display: "Blood (substance)"
      }
    ]
  },
  subject: {
    reference: "Patient/example"
  },
  collection: {
    collectedDateTime: "2012-05-23T08:08:00+01:00"
  },
  note: [{ text: "Bloed afgenomen" }]
};
