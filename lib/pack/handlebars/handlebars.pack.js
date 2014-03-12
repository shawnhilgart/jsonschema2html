/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

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
    build: function() {
        handlebars.registerHelper('ifEqual', function (v1, v2, options) {
            return v1 === v2 ? options.fn(this) : false;
        });

        this.built = true;
    }
};