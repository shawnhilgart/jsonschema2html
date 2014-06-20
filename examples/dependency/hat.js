/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
/*
    Renders html with pre populated values based on sample.schema.json
 */

var Schama2Html = require('../../lib/schema2html');
var sampleJson = require('../../test/fixtures/hat.sample.json');
var http = require('http');



  var parser = new Schama2Html(sampleJson);
  parser.buildForm(function(err, html) {
    console.log(err);
    console.log(html)
  });