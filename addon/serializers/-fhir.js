import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { set, get } from '@ember/object';
import { capitalize, camelize, dasherize } from '@ember/string';
import { isEmpty } from '@ember/utils';
import DS from 'ember-data';

const reserved = ['data', 'container', 'trigger', 'type'];

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  serialize(snapshot, options) {
    const hash = this._super(snapshot, options);
    const resourceType = capitalize(camelize(get(snapshot, 'modelName')));

    set(hash, 'resourceType', resourceType);

    return hash;
  },

  modelNameFromPayloadKey (key) {
    return dasherize(key);
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  },

  extractId(modelClass, resourceHash) {
    return get(resourceHash, 'id') || guidFor(resourceHash);
  },
  renameReservedProperties(resource) {
    return Object.keys(resource).reduce((acc, resourceKey) => {
      const value = resource[resourceKey];
      if (reserved.includes(resourceKey)) {
        acc[resourceKey + '_'] = value;
        delete resource[resourceKey];
      } else {
        acc[resourceKey] = value;
      }
      return acc;
    }, {});
  },
  /**
   * Get a modelName from the resource that it can use to look up the appropriate model for that part of the payload.
   * @protected
   * @param {Object} resource
   * @returns {String|null} The modelName of the model (null will skip the resource from being parsed to a model)
   */
  modelNameFromResource(payload) {
    return dasherize(payload.resourceType);
  },
  /**
   * Maps resources returned in a FHIR payload to records as expected in a JSON-API document
   * @protected
   * @param {Array} resources
   * @returns {Object} Object containing records
   */
  mapResourcesToRecords(resources) {
    return resources.reduce((acc, resource) => {
      resource = this.renameReservedProperties(resource);

      const typeName = this.modelNameFromResource(resource);
      if (typeName !== null) {
        if (!Array.isArray(acc[typeName])) {
          acc[typeName] = [];
        }

        acc[typeName].push(resource);
      }
      return acc;
    }, {});
  },
  /**
   * Normalize meta information from reponse
   * @param {Object} payload
   * @returns {Object} meta object of a JSON-API document
   */
  normalizeMeta(payload) {
    let meta = {};
    if (payload.link) {
      meta['pagination'] = payload.link.reduce((acc, link) => {
        acc[link.relation] = link.url;
        return acc;
      }, {});
    }

    if (payload.total) {
      meta['total'] = payload.total;
    }
    return meta;
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let resourceArray = null;
    let modelName = primaryModelClass.modelName;

    if (isEmpty(payload.entry)) {
      // This is a query where nothing was returned.
      // Create an empty array in the hash so that subsequent parsing doesn't complain that there are 0 expected objects
      if (payload.total === 0) {
        return this._super(
          store,
          primaryModelClass,
          { [modelName]: [] },
          id,
          requestType
        );
      } else {
        resourceArray = [payload];
      }
    } else {
      resourceArray = A(payload.entry).mapBy('resource');
    }

    let hash = this.mapResourcesToRecords(resourceArray);

    if (payload.total === 0 && !hash.hasOwnProperty(modelName)) {
      hash[modelName] = [];
    }

    hash.meta = this.normalizeMeta(payload);

    return this._super(store, primaryModelClass, hash, id, requestType);
  },

  normalizeArray(store, modelName, arrayHash, prop) {
    const documentHash = {
      data: A()
    };

    arrayHash.map(hash => {
      const resource = hash.resourceType;
      const modelClass = store.modelFor(resource);
      const serializer = store.serializerFor(resource);
      const normalizedSerializer = serializer.normalize(modelClass, hash, prop);

      documentHash.data.push(normalizedSerializer.data);
    });

    return documentHash;
  },

  pushPayload(store, payload) {
    const transformedPayload = this.mapResourcesToRecords([payload]);
    return this._super(store, transformedPayload);
  },
  /**
   * @protected
   * Override the extraction of relationships to (conditionally) rename reserved keys 'data' and 'type' to 'data_' and type_'.
   * @param {String} relationshipModelName
   * @param {Object} relationshipHash
   * @param {Boolean} renameReservedProperties
   * @return {Object}
   */
  extractRelationship(
    relationshipModelName,
    relationshipHash,
    renameReservedProperties = true
  ) {
    const hash = renameReservedProperties
      ? this.renameReservedProperties(relationshipHash)
      : relationshipHash;
    return this._super(relationshipModelName, hash);
  }
});
