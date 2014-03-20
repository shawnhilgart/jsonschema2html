/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var async = require('async');
var _ = require('lodash');
var schemaResolver = require('./schema.resolver');
var defaultFormPack = require('./pack/handlebars/handlebars.pack');

/**
 * @class SchemaDependencies
 * @description Resolves depdencies based on a json schema file
 *
 * @param {string} basePath directory path to base subsequent file based dependencies upon
 * 
 */

function SchemaDependencies(basePath) {
    this.dependencyCache = {};
    this.schemaBasePath = basePath;
}

/**
 * @callback SchemaDependencyCallback
 * @param {error} Error
 * @param {boolean} Did result come from cache?
 * @param {object} The resolved dependencies result should
 */

/**
 * @memberOf SchemaDependencies
 * @description Resolves and individual schema
 *
 * @param {string} ref
 * @param {object} schema
 * @param {SchemaDependencyCallback} callback
 */


SchemaDependencies.prototype.resolveSchemaDependency = function(ref, schema, callback) {
    var _that = this;

    if (_that.dependencyCache[ref] !== undefined) {
        callback(null, true, _that.dependencyCache[ref]); // we all ready loaded this dependency
        return;
    }

    // need to parse out logic here request,file, sub schema, etc
    if (ref.indexOf('#') === 0) {
        /*
            Internal pointer resolution needs some work, need to go into further research of the spec for this
         */
        schemaResolver.definition(schema, ref.replace('#/definitions/', ''), function(err, result) {
            _that.dependencyCache[ref] = result || null;
            callback(err, false, result);
        });
    } else if (ref.indexOf('http') === 0 || ref.indexOf('https') === 0) {
        // http reference
        schemaResolver.http(ref, function(err, result) {
            _that.dependencyCache[ref] = result || null;
            callback(err, false, result);
        });
    } else {
        // fs schema reference
        schemaResolver.file(this.schemaBasePath, ref, function(err, result) {
            _that.dependencyCache[ref] = result || null;
            callback(err, false, result);
        });
    }

};

/**
 * @memberOf SchemaDependencies
 * @description Resolves and individual external data source
 *
 * @param {*} ref
 * @param {DependencyLoopCallback}
 * 
 */

SchemaDependencies.prototype.resolveDataDependency = function(ref, rootSchema, callback) {
    var _that = this,
        handler,
        url,
        type,
        resolver,
        allowed = {
            'http': true,
            'https': true
        };

    // need to parse if we should use custom handler to resolve data
    handler = ref.split('://');
    type = handler[0];
    url = allowed[type] === true ? ref : handler.slice(1, handler.length).join("");

    resolver = schemaResolver[type];

    if (typeof resolver === 'function') {
        if (type === 'file') {
            resolver(this.schemaBasePath, url, function(err, result) {
                _that.dependencyCache[ref] = result || null;
                callback(err, result);
            });
        } else if (type === 'definition') {
            // this could use a bit of fixing to be more spec friendly
            resolver(rootSchema, url, function(err, result) {
                _that.dependencyCache[ref] = result || null;
                callback(err, result);
            });
        } else {
            resolver(url, function(err, result) {
                _that.dependencyCache[ref] = result || null;
                callback(err, result);
            });
        }
    } else {
        callback(new Error('No way to resolve data source:' + ref), null);
    }
};

/**
 * @callback DependencyLoopCallback
 * @param {error} Error
 * @param {object} The resolved dependencies result should
 */

/**
 * @memberOf SchemaDependencies
 * @description Resolves the anyOf paramater of a json schema object, and passes its result into the render loop
 *
 * @param {array} dependencies
 * @param {object} rootSchema
 * @param {object} q
 * @param {DependencyLoopCallback}
 */


SchemaDependencies.prototype.dependencyLoopAnyOf = function(dependencies, rootSchema, q, callback) {
    var _that = this,
        exited = false,
        funcs = [];

    dependencies.forEach(function(dependency) {
        if (dependency.$ref !== undefined && dependency.$ref !== null && exited === false) {

            funcs.push(
                function(cb) {
                    _that.resolveSchemaDependency(dependency.$ref, rootSchema, function(err, cached, result) {

                        if (err !== null) {
                            cb(err);
                        } else {
                            if (cached === false) {

                                q.push({schema: result, root: result}, function(err) {
                                    _that.dependencyPushError(err);
                                });
                            }

                            cb();
                        }

                    });
                }
            );
        } else {
            exited = true;
        }
    });

    if (exited === false) {
        async.parallel(funcs, function(err) {
            if (err !== null) {
                callback(err, null);
            } else {
                callback(null, null);
            }
        });
    } else {
        callback(new Error('$ref missing'), null); // no reference callback and exit
    }

};

/**
 * @memberOf SchemaDependencies
 * @description Iterates over an objects properties, passing them back into the render loop
 *
 * @param {object} schema
 * @param {object} rootSchema
 * @param {object} q
 * @param {DependencyLoopCallback}
 */

SchemaDependencies.prototype.dependencyLoopProperties = function(schema, rootSchema, q, callback) {
    var _that = this;

    schema.properties = schema.properties || {};
    // no schemas to resolve or length is 0 move on to props
    _.forOwn(schema.properties, function(property) {
        // push properties into the queue
        q.push({schema: property, root: rootSchema}, function(err) {
            _that.dependencyPushError(err);
        });
    
    });

    callback(null);
};

/**
 * @memberOf SchemaDependencies
 * @description Resolves any $ref or datasrc dependencies of an individual property
 *
 * @param {object} schema
 * @param {object} rootSchema
 * @param {object} q
 * @param {DependencyLoopCallback}
 */

SchemaDependencies.prototype.dependencyLoopProperty = function(schema, rootSchema, q, callback) {
    var _that = this,
        opts = schema.options || {};

    if (opts.datasrc) {
        _that.resolveDataDependency(opts.datasrc, rootSchema, function(err, result) {

            if (err !== null) {
                callback(new Error('could not resolve data:' + opts.datasrc), null);
            } else {
                callback(null, result);
            }
        });
    } else if (schema.$ref) {
        // single dependency
        _that.resolveSchemaDependency(schema.$ref, rootSchema, function(err, cached, result) {
            if (err !== null) {
                callback(err, null);
            } else {
                if (cached === false) {

                    q.push({schema: result, root: result});
                }

                callback(null, result);
            }
        });

    } else {
        callback(null, null);
    }
};

/**
 * @memberOf SchemaDependencies
 * @description Pushes errors into an array for dependencies that could not be resolved
 *
 * @param {array} e
 * @param {err} error The error to push intot the array
 */

SchemaDependencies.prototype.dependencyPushError = function(e, err) {
    if (err !== null && err !== undefined) {
        e.push(err.toString());
    }
};

/**
 * @memberOf SchemaDependencies
 * @description Main recurisve function, loops through all possible schema and loaded dependencies until all dependencies have been resolved, or an error has occured
 *
 * @param {object} schema
 * @param {DependencyLoopCallback}
 */

SchemaDependencies.prototype.resolveDependencies = function(schema, callback) {

    var _that = this,
        errors = [],
        q;

    q = async.queue(function(payload, asyncCallback) {
        var schema = payload.schema || {},
            root = payload.root;

        if (schema.type === 'object') {

            if (_.isArray(schema.anyOf) && schema.anyOf.length > 0) {
                // resolve sub schema 
                _that.dependencyLoopAnyOf(schema.anyOf, root, q, function(err) {
                    _that.dependencyPushError(errors, err);
                    asyncCallback();
                });
            } else if (_.isArray(schema.oneOf) && schema.oneOf.length > 0) {
                _that.dependencyLoopAnyOf(schema.oneOf, root, q, function(err) {
                    _that.dependencyPushError(errors, err);
                    asyncCallback();
                });
            } else {

                _that.dependencyLoopProperties(schema, root, q, function(err) {
                    _that.dependencyPushError(errors, err);
                    asyncCallback();

                });
            }

        } else if (schema.type === 'array') {

            if (schema.items) {
                q.push({schema: schema.items, root: schema.items});
            }

            asyncCallback(); // need to handle hidden references within array

        } else {

            _that.dependencyLoopProperty(schema, root, q, function(err) {
                _that.dependencyPushError(errors, err);
                asyncCallback();

            });

        }

    }, 1);

    q.drain = function() {
        if (errors.length > 0) {
            callback(new Error('Dependencies could not be resolved:' + errors.join(',')), null);
        } else {
            callback(null, _that.dependencyCache); // empty dependency queue, callback    
        }

    };

    q.push({root: schema, schema: schema}, function(err) {
        _that.dependencyPushError(errors, err);
    });
};

module.exports = SchemaDependencies;