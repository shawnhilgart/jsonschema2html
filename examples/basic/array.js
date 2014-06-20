/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
/*
    Renders html with pre populated values based on sample.schema.json
 */
var pack = require('../../lib/pack/handlebars-template/handlebars.template.pack.js');

var Schema2Html = require('../../lib/schema2html');
var sampleJson = require('./sample.array.schema.json');
var http = require('http');





var parser = new Schema2Html(sampleJson, null, {pack:pack,dataPrefix:'data'});
    parser.buildForm(function(err, html) {
        console.log(html);
    }); 
