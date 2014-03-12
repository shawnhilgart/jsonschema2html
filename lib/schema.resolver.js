/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var fs = require('fs');
var path = require('path');
var http = require('http');
var request = require('request');

/**
 * @description resolves a schema file from the local file system
 */

function resolveSchemaFile(basePath, refPath, callback) {
    var result,
        parseErr;

    if (basePath === undefined || basePath === null) {
        callback(new Error("No Basepath Specified"));
        return false;
    }

    fs.readFile(path.normalize(basePath + '/' + refPath), function(err, data) {
        if (err !== null) {
            callback(err);
        } else {
            try {
                result = JSON.parse(data);
            } catch (e) {
                parseErr = e;
            }

            callback(parseErr, result);
        }
    });

}

/**
 * @description resolves a schema file based on an internal definition
 */

function resolveSchemaDefinition(baseObject, refPath, callback) {

    if (baseObject === null) {
        callback(new Error("Missing Baseobject"));
        return;
    }

    baseObject.definitions = baseObject.definitions || {}; // stub in pointer


    if (baseObject.definitions[refPath]) {
        callback(null, baseObject.definitions[refPath]);
    } else {
        callback(new Error('missing definition'));
    }

    //callback(null, {"type": "object"});
}

/**
 * @description resolves a schema files based on http
 */

function resolveHttp(refPath, callback) {
    request(refPath, function(err, res, body) {
        var json;


        if (!err && res.statusCode === 200) {
            try {
                json = JSON.parse(body);
                callback(null, json);
            } catch (e) {
                callback(e);
            }
        } else {
            callback(new Error('failed to load resource:' + refPath));
        }

    });
}

/**
 * @description resolves a schema file based on https
 */

function resolveHttps(refPath, callback) {
    resolveHttp(refPath, callback);
}

module.exports = {
    file: resolveSchemaFile,
    definition: resolveSchemaDefinition,
    http: resolveHttp,
    https: resolveHttps
};