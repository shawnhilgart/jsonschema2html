/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
/*
    Renders html with pre populated values based on sample.schema.json
 */

var Schama2Html = require('../../lib/schema2html');
var sampleJson = require('./sample.schema.external.json');
var http = require('http');


http.createServer(function (req, res) {
  var parser = new Schama2Html(sampleJson);
  parser.buildForm(function(err, html) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
  });
}).listen(3000);