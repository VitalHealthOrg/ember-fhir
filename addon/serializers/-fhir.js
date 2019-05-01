import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { set, get } from '@ember/object';
import { capitalize, camelize, dasherize } from '@ember/string';
import { typeOf, isPresent, isNone, isEmpty } from '@ember/utils';
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

const reserved = [ 'data', 'container', 'trigger', 'type' ];

function coerceId(id) {
  if (id === null || id === undefined || id === '') {
    return null;
  }
  if (typeof id === 'string') {
    return id;
  }
  if (typeof id === 'symbol') {
    return id.toString();
  }
  return '' + id;
}

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  serialize(snapshot, options) {
    const hash = this._super(snapshot, options);
    const resourceType = capitalize(camelize(get(snapshot, 'modelName')));

    set(hash, 'resourceType', resourceType);

    return hash;
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  },

  extractId(modelClass, resourceHash) {
    return get(resourceHash, 'id') || guidFor(resourceHash);
  },
  /**
   * Maps resources returned in a FHIR payload to records as expected in a JSON-API document
   * @param {Array} resources
   * @returns {Object} Object containing records
   */
  mapResourcesToRecords(resources) {
    return resources.reduce((acc, resource) => {
      // fix reserved names
      reserved.forEach((property) => {
        if (resource.hasOwnProperty(property)) {
          resource[`${property}_`] = resource[property];
          delete resource[property];
        }
      });

      const typeName = pluralize(dasherize(resource.resourceType));
      
      if (!Array.isArray(acc[typeName])) {
        acc[typeName] = [];
      }

      acc[typeName].push(resource);
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
    if (isEmpty(payload.entry)) {
      // This is a query where nothing was returned.
      // Create an empty array in the hash so that subsequent parsing doesn't complain that there are 0 expected objects
      if (payload.total === 0) {
        let hash = {};
        hash[pluralize(primaryModelClass.modelName)] = [];
        return this._super(store, primaryModelClass, hash, id, requestType);
      } else {
        resourceArray = [ payload ];
      }
    } else {
      resourceArray = A(payload.entry).mapBy('resource');
    }

    let hash = this.mapResourcesToRecords(resourceArray);
    hash.meta = this.normalizeMeta(payload);

    return this._super(store, primaryModelClass, hash, id, requestType);
  },

  normalizeArray(store, modelName, arrayHash, prop) {
    const documentHash = {
      data: A()
    };

    arrayHash.map((hash) => {
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

  extractRelationship(relationshipModelName, relationshipHash) {
    if (isNone(relationshipHash)) {
      return null;
    }

    if (typeOf(relationshipHash) === 'object') {
      const id = relationshipHash.id;
      if (isPresent(id)) {
        set(relationshipHash, 'id', coerceId(id));
      }
      return relationshipHash;
    }

    return {
      id: this.extractId(relationshipHash),
      type: relationshipModelName
    };
  }
});
