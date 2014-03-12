/*jslint node: true,nomen: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var libpath = process.env.SCHEMA2HTML_COV ? '../lib-cov' : '../lib';
var pack = require(libpath + '/pack/handlebars/handlebars.pack');
var assert = require('assert');
var async = require('async');
var packTemplates = [
    "formOpen",
    "formClose",
    "groupItemOpen",
    "groupItemClose",
    "textfield",
    "textarea",
    "upload",
    "selectlist",
    "groupArrayOpen",
    "groupArrayClose",
    "help",
    "startGroup",
    "endGroup",
    "startGroupNoMethod",
    "startGroupHidden",
    "image",
    "readonly",
    "file",
    "hidden",
    "password"
];

describe('Pack', function() {



    describe('.loadTemplate', function() {
        it('Should return a compiled handlebars template', function(done) {

            pack.loadTemplate('formOpen', function(err, result) {
                assert.equal(err, null);
                assert.notEqual(result, null);

                done();
            });
        });

        it('Should return an error for missing template', function(done) {
            pack.loadTemplate('notATemplate', function(err) {
                assert.notEqual(err, null);

                done();
            });
        });

    });

    describe('.renderTemplate', function() {
        it('Should return an error for missing template', function(done) {
            pack.renderTemplate(null, {}, function(err) {
                assert.notEqual(err, null);

                done();
            });
        });

        it('Should return an error because of missing helper', function(done) {
            pack.loadTemplate('formOpen', function(err, template) {

                assert.equal(err, null);
                assert.equal(typeof template, 'function');

                pack.renderTemplate(template, {val: 1}, function(err) {
                    assert.notEqual(err, null);
                    assert.equal(err.message, "Missing helper: 'ifEqual'");
                    done();
                });
            });
        });

        it('Should render template with data', function(done) {
            pack.build();
            pack.loadTemplate('formOpen', function(err, template) {

                assert.equal(err, null);
                assert.equal(typeof template, 'function');

                pack.renderTemplate(template, {val: 1}, function(err, result) {
                    assert.equal(err, null);
                    assert.equal(typeof result, 'string');
                    done();
                });
            });
        });


    });

    describe('.build', function() {

        it('Should set property built to true', function(done) {
            pack.build();
            assert.equal(pack.built, true);
            done();
        });

    });

    describe('templateSanity', function() {
        it('Should load all templates with no errors', function(done) {
            pack.build();
            async.forEach(packTemplates, function(value, callback) {

                pack.loadTemplate(value, function(err, template) {
                    assert.equal(err, null);
                    assert.equal(typeof template, 'function');

                    callback(err);
                });


            }, function(err) {

                assert.equal(err, null);

                done();
            });
        });

        it('Should load and render all templates with no errors', function(done) {
            pack.build();
            async.forEach(packTemplates, function(value, callback) {

                pack.loadTemplate(value, function(err, template) {
                    assert.equal(err, null);
                    assert.equal(typeof template, 'function');

                    pack.renderTemplate(template, {}, function(err, result) {
                        assert.equal(err, null);
                        assert.equal(typeof result, 'string');
                        callback(err);
                    });
                });


            }, function(err) {

                assert.equal(err, null);
                done();
            });
        });
    });

});