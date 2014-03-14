/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var async = require('async');
var _ = require('lodash');
var schemaResolver = require('./schema.resolver');
var defaultFormPack = require('./pack/handlebars/handlebars.pack');


function SchemaDependencies(basePath) {
    this.dependencyCache = {};
    this.schemaBasePath = basePath;
}

/**
 * @memberOf Schema2Html
 * @description Resolves and individual schema
 */


SchemaDependencies.prototype.resolveSchemaDependency = function(ref, schema, callback) {
    var _that = this;

    if (_that.dependencyCache[ref] !== undefined) {
        callback(null, true, _that.dependencyCache[ref]); // we all ready loaded this dependency
        return;
    }

    // need to parse out logic here request,file, sub schema, etc
    if (ref.indexOf('#') === 0) {
        // local schema reference
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
 * @memberOf Schema2Html
 * @description Resolves and individual external data source
 */

SchemaDependencies.prototype.resolveDataDependency = function(ref, callback) {
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
        if(type === 'file') { 
            resolver(this.schemaBasePath, url, function(err, result) {
                _that.dependencyCache[ref] = result || null;
                callback(err, false, result);
            });
        } else {
            resolver(url, function(err, result) {
                _that.dependencyCache[ref] = result || null;
                callback(err, false, result);
            });
        }
    } else {
        callback(new Error('No way to resolve data source:' + ref), false, null);
    }
};


SchemaDependencies.prototype.dependencyLoopAnyOf = function(schema, rootSchema, q, callback) {
    var _that = this,
        total = schema.anyOf.length,
        count = 0,
        exited = false;

    schema.anyOf.forEach(function(dependency) {
        if (dependency.$ref && exited === false) {


            _that.resolveSchemaDependency(dependency.$ref, rootSchema, function(err, cached, result) {

                if (err !== null) {
                    //callback(err);
                    total = count;
                } else {
                    if (cached === false) {

                        q.push({schema: result, root: result}, function(err) {

                        });
                    }

                    count += 1;
                }

                if (total === count && exited === false) {
                    callback(err, null); // resolved all of our references, callback and exit
                }
            });


        } else if(exited === false) {
            exited = true;
            callback(new Error('$ref missing'), null); // no reference callback and exit
        }
    });

};

SchemaDependencies.prototype.dependencyLoopProperties = function(schema, rootSchema, q, callback) {
    schema.properties = schema.properties || {};
    // no schemas to resolve or length is 0 move on to props
    _.forOwn(schema.properties, function(property) {
        // push properties into the queue
        q.push({schema: property, root: rootSchema}, function(err) {

        });
    });

    callback(null);
};

SchemaDependencies.prototype.dependencyLoopProperty = function(schema, rootSchema, q, callback) {
    var _that = this,
        opts = schema.options || {};

    if (opts.datasrc) {
        _that.resolveDataDependency(opts.datasrc, function(err, cached, result) {
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
                callback(null, result);
            }
        });

    } else {
        callback(null, null);
    }
};

SchemaDependencies.prototype.dependencyLoopDataSource = function(schema) {

};

SchemaDependencies.prototype.dependencyPushError = function(e, err) {
    if (err !== null && err !== undefined) {
        e.push(err.toString());
    }
};

/**
 * @memberOf Schema2Html
 * @description Resolves all external dependencies so the render loop can move through rendering the form without needing to stop and resolve
 */


SchemaDependencies.prototype.resolveDependencies = function(schema, callback) {

    var _that = this,
        errors = [],
        q;

    q = async.queue(function(payload, asyncCallback) {
        var dependencies = [],
            total = 0,
            count = 0,
            schema = payload.schema || {},
            root = payload.root;

        if (schema.type === 'object') {

            if (_.isArray(schema.anyOf) && schema.anyOf.length > 0) {
                // resolve sub schema 
                _that.dependencyLoopAnyOf(schema, root, q, function(err) {
                    _that.dependencyPushError(errors, err);
                    asyncCallback(err);
                });
            } else {

                _that.dependencyLoopProperties(schema, root, q, function(err) {
                    _that.dependencyPushError(errors, err);
                    asyncCallback(err);
                });
            }

        } else if (schema.type === 'array') {
            asyncCallback(); // need to handle hidden references within array
        } else {

            _that.dependencyLoopProperty(schema, root, q, function(err) {
                _that.dependencyPushError(errors, err);
                asyncCallback(err);
            });

        }

    });

    q.drain = function() {
        if (errors.length > 0) {
            callback(new Error('Dependencies could not be resolved:' + errors.join(',')));
        } else {
            callback(null, _that.dependencyCache); // empty dependency queue, callback    
        }

    };

    q.push({root: schema, schema: schema}, function(err) {

    });
};

module.exports = SchemaDependencies;