/*jslint node: true,nomen: true, vars: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var libpath = process.env.SCHEMA2HTML_COV ? '../lib-cov' : '../lib';

var Schema2html = require(libpath + '/schema2html.js');
var dependency = require(libpath + '/schema.resolver');
var SchemaDependencies = require(libpath + '/schema.dependencies');
var sampleSchema = require('./fixtures/sample.schema.json');
var assert = require('assert');
var path = require('path');

function FQueue() {
    this.queue = [];
}

FQueue.prototype.push = function(p1) {
    this.queue.push(p1);
};


/*
resolveSchemaDependency = function(ref, schema, callback)
resolveDataDependency = function(ref, callback)
dependencyLoopAnyOf = function(schema, rootSchema, q, callback) 
dependencyLoopProperties = function(schema, rootSchema, q, callback)
dependencyPushError = function(e, err) {
    dependencyLoopProperty = function(schema, rootSchema, q, callback) {
        resolveDependencies = function(schema, callback) {
 */

describe('SchemaDependencies', function() {

    /*
        Resolve a depedenedy
     */

    describe('.resolveSchemaDependency', function() {

        it('should resolve a dependency', function(done) {

            var dependencies = new SchemaDependencies();

            dependencies.resolveSchemaDependency('http://json-schema.org/geo', {}, function(err, cached, result) {
                assert.notEqual(result, null);
                assert.equal(cached, false);
                assert.equal(err, null);
                done();
            });
        });

        it('should callback with an error bad json', function(done) {

            var dependencies = new SchemaDependencies();

            dependencies.resolveSchemaDependency('http://wcst.com', {}, function(err, cached, result) {
                assert.notEqual(err, null);
                assert.equal(cached, false);
                assert.equal(result, null);
                done();
            });
        });

        it('should resolve json from cache', function(done) {

            var schema = {
                definitions: {
                    myRef: {
                        type: 'object'
                    }
                }
            };

            var dependencies = new SchemaDependencies();

            dependencies.resolveSchemaDependency('#/definitions/myRef', schema, function(err, cached, result) {
                assert.equal(err, null);
                assert.equal(cached, false);
                assert.equal(result.type, 'object');
                dependencies.resolveSchemaDependency('#/definitions/myRef', null, function(err, cached, result) {
                    assert.equal(err, null);
                    assert.equal(result.type, 'object');
                    assert.equal(cached, true);
                    done();
                });


            });
        });

        it('should callback with an error for bad file path', function(done) {

            var dependencies = new SchemaDependencies();

            dependencies.resolveSchemaDependency('./bad.json', {}, function(err, cached, result) {
                assert.equal(result, null);
                assert.notEqual(err, null);
                assert.equal(cached, false);
                done();
            });
        });

        it('should callback with resolved json', function(done) {

            var dependencies = new SchemaDependencies(__dirname);

            dependencies.resolveSchemaDependency('./fixtures/sample.schema.json', {}, function(err, cached, result) {
                assert.equal(err, null);
                assert.equal(cached, false);
                assert.equal(result.type, 'object');
                done();
            });
        });

    });


    describe('.resolveDataDependency', function() {

        it('Should callback with data', function(done) {
            var dependencies = new SchemaDependencies(__dirname);

            dependencies.resolveDataDependency('file://fixtures/hat.sample.json', function(err, result) {
                assert.equal(err, null);
                assert.equal(result.type, 'object');
                done();
            });

        });

        it('Should callback with data', function(done) {
            var dependencies = new SchemaDependencies(__dirname);

            dependencies.resolveDataDependency('http://json-schema.org/geo', function(err, result) {
                assert.equal(err, null);
                assert.equal(result.type, 'object');
                done();
            });

        });

        it('Should callback with an error, we have no way to resolve the file', function(done) {
            var dependencies = new SchemaDependencies(__dirname);

            dependencies.resolveDataDependency('bad://json-schema.org/geo', function(err, result) {
                assert.notEqual(err, null);
                assert.equal(result, null);
                done();
            });

        });

    });

    describe('.dependencyLoopAnyOf', function() {

        it('Should resolve all of the dependencies', function(done) {
            var schema = {
                anyOf: [
                    {$ref: './fixtures/sample.schema.json'},
                    {$ref: './fixtures/sample.two.json'}
                ]
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);

            dependencies.dependencyLoopAnyOf(schema.anyOf, schema, q, function(err, result) {

                assert.equal(err, null);
                assert.equal(result, null);
                //assert.equal(result.type,'object');
                done();
            });
        });

        it('Should callback with an error, dependency could not be resolved', function(done) {
            var schema = {
                anyOf: [
                    {$ref: './fixtures/bad.path.json'},
                    {$ref: './fixtures/sample.two.json'}
                ]
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopAnyOf(schema.anyOf, schema, q, function(err, result) {

                assert.notEqual(err, null);
                assert.equal(result, null);
                //assert.equal(result.type,'object');
                done();
            });
        });

        it('Should callback with an error, missing ref tag', function(done) {
            var schema = {
                anyOf: [
                    './fixtures/bad.path.json',
                    {$ref: './fixtures/sample.two.json'}
                ]
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopAnyOf(schema.anyOf, schema, q, function(err, result) {
                assert.notEqual(err, null);
                assert.equal(result, null);
                //assert.equal(result.type,'object');
                done();
            });
        });

    });

    describe('.dependencyLoopProperty', function() {

        it('Should callback with no error and empty result', function(done) {
            var schema = {};
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopProperty(schema, schema, q, function(err, result) {

                assert.equal(err, null);
                assert.equal(result, null);
                //assert.equal(result.type,'object');
                done();
            });
        });


        it('Should callback with result property set', function(done) {
            var schema = {
                $ref: './fixtures/sample.two.json'
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopProperty(schema, schema, q, function(err, result) {

                assert.equal(err, null);
                assert.equal(result.type, 'object');
                done();
            });
        });

        it('Should callback with result property set', function(done) {
            var schema = {
                options: {
                    datasrc: 'file://fixtures/sample.two.json'
                }
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopProperty(schema, schema, q, function(err, result) {

                assert.equal(err, null);
                assert.equal(result.type, 'object');
                done();
            });
        });

        it('Should callback with an error could not resolve dependency', function(done) {
            var schema = {
                options: {
                    datasrc: 'file://fixtures/badpath/sample.two.json'
                }
            };
            var q = new FQueue();
            var dependencies = new SchemaDependencies(__dirname);
            dependencies.dependencyLoopProperty(schema, schema, q, function(err, result) {
                assert.equal(result, null);
                assert.notEqual(err, null);
                done();
            });
        });

    });

    describe('.resolveDependencies', function() {

        it('Should resolve dependencies', function(done) {
            var schema = {
                type: 'object',
                anyOf: [
                    {$ref: './fixtures/sample.two.json'},
                    {$ref: './fixtures/sample.two.json'}
                ]
            };

            var dependencies = new SchemaDependencies(__dirname);
            dependencies.resolveDependencies(schema, function(err, result) {
                assert.notEqual(result, null);
                assert.equal(err, null);
                done();
            });
        });

        it('Should resolve dependencies', function(done) {
            var schema = {
                type: 'array'
            };

            var dependencies = new SchemaDependencies(__dirname);
            dependencies.resolveDependencies(schema, function(err, result) {
                assert.notEqual(result, null);
                assert.equal(err, null);
                done();
            });
        });


        it('Should resolve dependencies', function(done) {
            var schema = {
                type: 'array',
                items: {
                    type: 'object',
                    anyOf: [
                        {$ref: './fixtures/sample.two.json'},
                        {$ref: './fixtures/sample.two.json'}
                    ]
                }
            };

            var dependencies = new SchemaDependencies(__dirname);
            dependencies.resolveDependencies(schema, function(err, result) {
                assert.notEqual(result, null);
                assert.equal(err, null);
                done();
            });
        });

    });


});