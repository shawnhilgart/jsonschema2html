/*jslint node: true,nomen: true */
'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var Schema2Html = require('../lib/schema2html');
var pack = require('../lib/pack/handlebars-template/handlebars.template.pack.js');
var handlebars = require('handlebars');
var fs = require('fs');
var hbs = fs.readFileSync(__dirname + '/../examples/wcst/output/rsq.project.hbs').toString();
var project = require('../examples/wcst/sample.project.json');
var template = handlebars.compile(hbs);

// add tests
suite.add('Schema2Html#buildForm', function() {
    var parser = new Schema2Html({type: "object"},{},{pack:pack});
    parser.buildForm(function(err) {
        if (err) {
            throw err;
        }
    });
}).add('HBSRender', function() {

    template(project);

}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    process.exit();
}).run({ 'async': true });