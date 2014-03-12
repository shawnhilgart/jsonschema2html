/*jslint node: true,nomen: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var libpath = process.env.SCHEMA2HTML_COV ? '../lib-cov' : '../lib';

var Schema2html = require(libpath + '/schema2html.js');
var dependency = require(libpath + '/schema.resolver');
var sampleSchema = require('./fixtures/sample.schema.json');
var assert = require('assert');
var path = require('path');

describe('SchemaDependencies', function() {

    /*
        File based dependencies
     */

    describe('.resolveSchemaFile', function() {
        it('Should return a string with json schema file', function(done) {
            dependency.file(__dirname, 'fixtures/sample.schema.json', function(err) {
                assert.equal(err, null);
                done();
            });

        });

        it('Should return a file not found error', function(done) {
            dependency.file(__dirname, 'fixtures/badpath/sample.schema.json', function(err) {
                assert.notEqual(err, null);
                done();
            });

        });

        it('Should return a bad basepath error', function(done) {
            dependency.file(null, 'fixtures/badpath/sample.schema.json', function(err) {
                assert.notEqual(err, null);
                done();
            });

        });

        it('Should return an error for bad json', function(done) {
            dependency.file(__dirname, 'fixtures/bad.json', function(err) {
                assert.notEqual(err, null);
                done();
            });

        });
    });

    /*
        Http based dependencies
     */

    describe('.resolveHttp', function() {

        it('should resolve schema at json-schema.org/geo', function(done) {
            dependency.http('http://json-schema.org/geo', function(err, json) {
                assert.equal(err, null);
                assert.equal(json.type, 'object');
                done();
            });
        });

        it('should return an error', function(done) {
            dependency.http('http://localhost', function(err) {
                assert.notEqual(err, null);
                done();
            });
        });

        it('should return an json parse error', function(done) {
            dependency.http('http://wcst.com', function(err) {
                assert.notEqual(err, null);
                done();
            });
        });

    });

    /*
        Https based dependencies
     */

    describe('.resolveHttps', function() {

        it('should resolve schema at json-schema.org/geo', function(done) {
            dependency.https('http://json-schema.org/geo', function(err, json) {
                assert.equal(err, null);
                assert.equal(json.type, 'object');
                done();
            });
        });
    });

    /*
        Internal definition dependencies
     */

    describe('.resolveSchemaDefinition', function() {

        it('should return an error', function(done) {
            dependency.definition(null, 'badDefinition', function(err) {
                assert.notEqual(err, null);
                done();
            });
        });

        it('should return an error missing definition', function(done) {
            dependency.definition({}, 'missing', function(err) {
                assert.notEqual(err, null);
                done();
            });
        });

        it('should return a json defintions', function(done) {

            var schema = {
                type: 'object',
                properties: {},
                definitions: {
                    nfs: {
                        type: 'object'
                    }
                }
            };

            dependency.definition(schema, 'nfs', function(err, json) {
                assert.equal(err, null);
                assert.equal(json.type, 'object');
                done();
            });
        });


    });

});