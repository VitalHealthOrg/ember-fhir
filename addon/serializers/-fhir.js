import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { merge } from '@ember/polyfills';
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
/**
 * @param {Array} resources
 * @returns {Object}
 */
function mapResourcesToRecordsHash(resources) {
  let hash = {};
  resources.forEach((resource) => {
    // fix reserved names
    reserved.forEach((property) => {
      if (resource.hasOwnProperty(property)) {
        resource[`${property}_`] = resource[property];
        delete resource[property];
      }
    });

    const type = pluralize(dasherize(resource.resourceType));
    if (isEmpty(get(hash, type))) {
      set(hash, type, A());
    }

    hash[type].push(resource);
  });
  return hash;
}

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  serialize(snapshot, options) {
    const hash = this._super(snapshot, options),
      resourceType = capitalize(camelize(get(snapshot, 'modelName')));

    set(hash, 'resourceType', resourceType);

    return hash;
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    merge(hash, this.serialize(snapshot, options));
  },

  extractId(modelClass, resourceHash) {
    return get(resourceHash, 'id') ||
      guidFor(resourceHash);
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let resourceArray = null,
      hash = {
        'meta': {},
      };

    if (isEmpty(get(payload, 'entry'))) {
      // This is a query where nothing was returned.
      // Create an empty array in the hash so that subsequent parsing doesn't complain that there are 0 expected objects
      if (payload.total === 0) {
        hash[pluralize(primaryModelClass.modelName)] = [];
        return this._super(store, primaryModelClass, hash, id, requestType);
      } else {
        if (payload.total === 0) {
          hash[pluralize(primaryModelClass.modelName)] = [];
        }
        resourceArray = [ payload ];
      }
    } else {
      resourceArray = get(payload, 'entry').mapBy('resource');
    }

    Object.assign(hash, mapResourcesToRecordsHash(resourceArray));

    if (payload.link) {
      let meta = {};
      payload.link.forEach(link => { meta[link.relation] = link.url; });
      hash['meta']['pagination'] = meta;
    }

    if (payload.total) {
      hash['meta']['total'] = payload.total;
    }

    return this._super(store, primaryModelClass, hash, id, requestType);
  },

  normalizeArray(store, modelName, arrayHash, prop) {
    const documentHash = {
      data: A()
    };

    arrayHash.map((hash) => {
      const resource = get(hash, 'resourceType'),
        modelClass = store.modelFor(resource),
        serializer = store.serializerFor(resource),
        normalizedSerializer = serializer.normalize(modelClass, hash, prop),
        data = get(normalizedSerializer, 'data');

      get(documentHash, 'data').push(data);
    });

    return documentHash;
  },

  pushPayload(store, payload) {
    const transformedPayload = mapResourcesToRecordsHash([payload]);
    return this._super(store, transformedPayload);
  },

  extractRelationship(relationshipModelName, relationshipHash) {
    if (isNone(relationshipHash)) {
      return null;
    }

    if (typeOf(relationshipHash) === 'object') {
      const id = get(relationshipHash, 'id');
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
