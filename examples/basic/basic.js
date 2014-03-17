/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
/*
    Renders html with pre populated values based on sample.schema.json
 */

var Schema2Html = require('../../lib/schema2html');
var sampleJson = require('./sample.schema.json');
var http = require('http');




http.createServer(function (req, res) {

var schema = {
    "id":"sample",
    "type":"object",
    "properties":{
        "author":{
            "type":"string"
        },
        "bookTitle":{
            "type":"string"
        }
    }

}

var parser = new Schema2Html(schema, null, null);
    parser.buildForm(function(err, html) {
        console.log(html);
    }); 
}).listen(3000);