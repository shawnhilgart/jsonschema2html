/*jslint node: true,nomen: true, vars: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var libpath = process.env.SCHEMA2HTML_COV ? '../lib-cov' : '../lib';

var Schema2html = require(libpath + '/schema2html.js');
var sampleSchema = require('./fixtures/sample.schema.json');
var assert = require('assert');
var path = require('path');

describe('Schema2html', function() {

    describe('.generateId', function() {
        it('Should return a string with no [].', function(done) {

            var parser = new Schema2html(),
                id = parser.generateId('my[test][id]');

            assert.equal(id.indexOf('[') > 0, false);
            assert.equal(id.indexOf(']') > 0, false);
            assert.equal(id.indexOf('.') > 0, false);
            assert.equal(id.indexOf('-') > 0, true);

            done();

        });
    });

    describe('.addFormOpen', function() {

        it('Should return a function with a single callback argument', function(done) {

            var parser = new Schema2html(),
                func =  parser.addFormOpen('id', 'http://example.com', 'POST');

            func(function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.addGroupOpen', function() {

        it('Should return a function with a single callback argument', function(done) {

            var parser = new Schema2html(),
                func =  parser.addGroupOpen('id', 100);

            func(function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.renderGroupOpen', function() {

        it('Should return rendered html', function(done) {

            var parser = new Schema2html();

            parser.renderGroupOpen('id', 3, 1, function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.renderTemplate', function() {

        it('Should return error because of a bogus template', function(done) {

            var parser = new Schema2html();

            parser.renderTemplate('bogus', null, function(err, result) {
                assert.equal(result, null);
                assert.notEqual(err, null);
                done();
            });

        });
    });


    describe('.addGroupClose', function() {

        it('Should return a function with a single callback argument', function(done) {

            var parser = new Schema2html(),
                func =  parser.addGroupClose();

            func(function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.renderGroupClose', function() {

        it('Should return rendered html', function(done) {

            var parser = new Schema2html();

            parser.renderGroupClose({},function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.addFormClose', function() {

        it('Should return a function with a single callback argument', function(done) {

            var parser = new Schema2html(),
                func =  parser.addFormClose();

            func(function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.renderFormTag', function() {

        it('Should return rendered html', function(done) {

            var parser = new Schema2html();

            parser.renderFormTag('formOpen', 'id', 'http://example.com', 'POST', function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });

        it('Should use the cached version of the handlebars template', function(done) {

            var parser = new Schema2html();

            parser.renderFormTag('formOpen', 'id', 'http://example.com', 'POST', function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                parser.renderFormTag('formOpen', 'id', 'http://example.com', 'POST', function(err, resultTwo) {
                    assert.equal(err, null);
                    assert.notEqual(resultTwo, null);
                    done();
                });
            });

        });

        it('it should render the formClose tag', function(done) {

            var parser = new Schema2html();

            parser.renderFormTag('formClose', 'id', 'http://example.com', 'POST', function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.renderString(id, name, val, label, src, options, required, callback)', function() {

        it('Should return rendered html', function(done) {

            var parser = new Schema2html();

            parser.renderString('id', 'test[name]', 'value', 'label', 'src', null, true, function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);
                done();
            });

        });
    });

    describe('.buildForm', function() {

        it('Should return fully rendered html', function(done) {

            var parser = new Schema2html(sampleSchema);

            parser.buildForm(function(err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                assert.equal(new RegExp('<form').test(data), true);
                assert.equal(new RegExp("<\/form").test(data), true);
                done();
            });

        });

         it('Should return fully rendered html for hat.sample.json', function(done) {

            var schema = require('./fixtures/hat.sample.json')
            var parser = new Schema2html(schema);

            parser.buildForm(function(err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                assert.equal(new RegExp('<form').test(data), true);
                assert.equal(new RegExp("<\/form").test(data), true);
                done();
            });

        });

        it('Should return an error', function(done) {

            var schema = {
                $ref : 'http://bogus.url.com'
            };

            this.timeout(5000);

            var parser = new Schema2html(schema);

            parser.buildForm(function(err, data) {
                assert.notEqual(err, null);
                assert.equal(data, null);
                done();
            });

        });

    });

    /*
    describe('.resolveSchemaDependency', function() {

        it('Should resolve a single dependency', function(done) {
            this.timeout(5000);

            var parser = new Schema2html(sampleSchema);

            parser.resolveSchemaDependency('#/definitions/ref', sampleSchema, function(err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                done();
            });
        });

    });

    describe('.resolveDependencies', function() {

        it('Should all dependencies within a schema file', function(done) {
            this.timeout(5000);
            var options = {
                schemaBasePath: path.resolve('./test/fixtures')
            };

            var parser = new Schema2html(require('./fixtures/sample.depend.schema.json'), null, options);

            parser.resolveDependencies(require('./fixtures/sample.depend.schema.json'), function(err) {

                assert.equal(err, null);
                done();
            });
        });

    });
*/




});

