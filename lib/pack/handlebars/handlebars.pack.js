/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

/*
    Proposed format for a Form pack, which is comprised of a template key registry, a template loading, and template rendering. 
    This should let the Schema2Html library be compatible with multiple template rendering/loading methods.
 */

var fs = require('fs');
var handlebars = require('handlebars');

module.exports = {
    built: false,
    templates: {
        "formOpen": 'templates/form.open.hbs',
        "formClose": 'templates/form.close.hbs',
        "groupItemOpen": 'templates/group.item.open.hbs',
        "groupItemClose": 'templates/group.item.close.hbs',
        "textfield": 'templates/textfield.hbs',
        "textarea": 'templates/textarea.hbs',
        "upload": 'templates/upload.hbs',
        "selectlist": 'templates/select.list.hbs',
        "groupArrayOpen": 'templates/group.array.open.hbs',
        "groupArrayClose": 'templates/group.array.close.hbs',
        "help": 'templates/help.hbs',
        "startGroup": 'templates/group.open.hbs',
        "endGroup": 'templates/group.close.hbs',
        "startGroupNoMethod": 'templates/group.no.method.open.hbs',
        "startGroupHidden": 'templates/group.hidden.open.hbs',
        "image": "templates/image.hbs",
        "readonly": "templates/readonly.hbs",
        "file": "templates/file.hbs",
        "hidden": "templates/hidden.hbs",
        "password": "templates/password.hbs"
    },

    /**
     * @description Template loading method, each formPack should provide its own method to load its template files
     *
     * @param {string} key Key file for template to load
     * @param {function} callback Callback function accepts err and result
     */

    loadTemplate: function(key, callback) {
        var path = this.templates[key];
        fs.readFile(__dirname + '/' + path, function(err, data) {
            var html;

            if (err !== null) {
                html = null;
            } else {
                html = handlebars.compile(data.toString());
            }

            callback(err, html);
        });
    },

    /**
     * @description Template rendering method, each formPack should provide its own rendering method
     *
     * @param {*} template Template (function, object, or string) returned from the loadTemplate function
     * @param {object} data Data object from json schema
     * @param {function} callback callback function accepts err, and result
     */

    renderTemplate: function(template, data, callback) {
        var result = null,
            err = null;

        if (template === null) {
            callback(new Error("Could not render template of null"));
        } else {

            try {
                result = template(data);
            } catch (e) {
                err = e;
            }

            callback(err, result);
        }
    },

    /**
     * @description Utility function to clear up any runtime dependencies neccesary to run the form pack
     */

    build: function() {
        handlebars.registerHelper('ifEqual', function (v1, v2, options) {
            return v1 === v2 ? options.fn(this) : false;
        });

        this.built = true;
    },

    /**
     * @description Utility function to manage roles for each item within a schema file, called by the render loop on each schema item
     */

    security: function(schema) {
        return true;
    }
};