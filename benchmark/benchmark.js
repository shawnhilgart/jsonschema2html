/*jslint node: true,nomen: true */
'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var Schema2Html = require('../lib/schema2html');

// add tests
suite.add('Schema2Html#buildForm', function() {
    var parser = new Schema2Html({type: "object"});
    parser.buildForm(function(err) {
        if (err) {
            throw err;
        }
    });
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    process.exit();
}).run({ 'async': true });