/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var async = require('async');
var _ = require('lodash');
var schemaResolver = require('./schema.resolver');
var SchemaDependencies = require('./schema.dependencies');
var defaultFormPack = require('./pack/handlebars/handlebars.pack');
var util = require('./schema.util');

/**
 * @class Schema2Html
 *
 * @param {object} schema Json Schema object to render into form
 * @param {object} data Data object to render
 * @param {Schema2HtmlOptions} options Configuration object for rendering loop
 */

/**
 * @typedef Schema2HtmlOptions
 * @description Configuration object for render loop
 *
 * @param {string} schemaBasePath If loading $ref schema files from local fs, path should be specified
 * @param {string} dataPrefix If your data needs prefixing, assign the a prefix to each variable and name
 * @param {object} pack Form pack to use
 */

function Schema2Html(schema, data, options) {
    this.schema = schema || {};
    this.data = data || {};
    this.options = options || {};
    this.options.dataPrefix = this.options.dataPrefix || null;
    this.templates = {};
    this.funcs = [];
    this.html = [];
    this.dependencyCache = {};
    this.additionalData = {};
    this.schemaBasePath = this.options.schemaBasePath;
    this.pack = this.options.pack || defaultFormPack;
    this.pack.build();
    this.renderMode = this.pack.renderMode || 1;
    this.pos = 0;
    this.arrayLoopCount = 0;
    this.rawData = this.options.rawData || false;
    this.lookupTable = {
        object: this.renderLoopObject.bind(this),
        string: this.renderLoopString.bind(this),
        array: this.renderLoopArray.bind(this),
        number: this.renderLoopNumber.bind(this),
        integer: this.renderLoopInteger.bind(this),
        boolean: this.renderLoopBoolean.bind(this),
        ref: this.renderLoopRef.bind(this)
    };
}

/**
 * @memberOf Schema2Html
 * @description Add a data resolving function
 *
 * @param {string} key
 * @param {function} func
 */

Schema2Html.prototype.addResolver = function(key, func) {
    schemaResolver[key] = func;
};

/**
 * @memberOf Schema2Html
 * @description Load all dependencies and output html form
 *
 * @param {function} callback
 */

Schema2Html.prototype.buildForm = function(callback) {
    var _that = this,
        schemaDependencies = new SchemaDependencies(this.options.schemaBasePath);



    schemaDependencies.resolveDependencies(this.schema, function(err, dependencies) {



        if (err !== null) {
            callback(err);
            return null;
        }

        _that.dependencyCache = dependencies;
        _that.addRenderTask(_that.addFormOpen(_that.schema.id));
        _that.renderLoop(_that.schema, 0, _that.options.dataPrefix, false);
        _that.addRenderTask(_that.addFormClose());

        async.series(_that.funcs, function(err) {
            callback(err, _that.html.join(""));
        });
    });

};

/**
 * @memberOf Schema2Html
 * @description Main circular render loop, all objects are passed through the loop, with render functions then being executed through the aysnc library
 *
 * @param {object} schema
 * @param {integer} depth
 * @param {string} scopeName
 */

Schema2Html.prototype.renderLoop = function(schema, depth, scopeName) {
    schema = schema || {};
    var type = schema.$ref ? 'ref' : schema.type,
        id = schema.id || scopeName,
        execProcess;

    id = this.generateId(id);

    execProcess = this.lookupTable[type] || null;

    if (execProcess !== null && this.pack.security(schema) === true) {
        execProcess(id, scopeName, depth, schema);
    }
};

/**
 * @memberOf Schema2Html
 * @description adds an individual render task for the string schema type
 *
 * @param {string} id html id string
 * @param {string} name html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopString = function(id, name, depth, schema) {
    var label = schema.title || name,
        options = schema.options || {},
        val = util.retrieveValue(this.data, name, false);

    options.depth = depth;
    options.key = util.dotSyntax(name);


    this.addRenderTask(this.addString(id, name, val, label, null, options));
};

/**
 * @memberOf Schema2Html
 * 
 * @param {string} id html id string
 * @param {string} name html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 * 
 */

Schema2Html.prototype.renderLoopRef = function(id, name, depth, schema) {
    //this.dependencyCache[schema.$ref].type || null; // try ref if no type
    this.renderLoop(this.dependencyCache[schema.$ref], depth, name);
};

/**
 * @memberOf Schema2Html
 * @description renders schema#object
 *
 * @param {string} id html id string
 * @param {string} scopeName html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopObject = function(id, scopeName, depth, schema) {
    var _that = this, name, match, options;

    options = schema.options || {};
    depth += 1;

    this.addRenderTask(this.addGroupOpen(id, 0, depth)); // open a group

    _.forOwn(schema.properties, function(property, key) {
        name = _that.generateName(scopeName, key);
        property.id = _that.generateId(name);
        if (property.anyOf !== undefined) {
            if (_.isArray(property.anyOf)) {
                match = options.matchOn;

                _that.renderLoopArrayAnyOf(id, scopeName, depth, 0, match, property.anyOf);

            }
        } else {
            _that.renderLoop(property, depth + 1, name); // send property back in the loop
        }
    });

    this.addRenderTask(this.addGroupClose(id, depth)); // close group


};

/**
 * @memberOf Schema2Html
 * @description adds an individual render task for the array schema type
 *
 * @param {string} id
 * @param {string} name
 * @param {integer} depth
 * @param {integer} index
 * @param {string} match
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopArrayAnyOf = function(id, name, depth, index, match, schema) {
    var _that = this,
        ref,
        matchVal;

    _that.arrayLoopCount += 1;

    schema.anyOf.forEach(function(val) {
        ref = val.$ref;

        matchVal = util.retrieveValue(_that.data, (name + '[' + index + ']' + '[' + match + ']'));

        if (ref === matchVal && _that.renderMode !== 2) {
            _that.renderLoop(_that.dependencyCache[ref], (depth + 1), (name + '[' + index + ']'));
        } else if (_that.renderMode === 2) {
            // render mode is 2, means were rendering a template based output
            var indexVal = _that.pack.engine.index;
            var backtickVal = _that.pack.engine.backTick;
            var open = _that.pack.engine.open;
            var close =  _that.pack.engine.close;

            _that.addRenderTask(_that.addAnyOfOpen(ref));
            _that.renderLoop(_that.dependencyCache[ref], (depth + 1), (name + '[' + open + util.repeat(_that.arrayLoopCount, backtickVal) + indexVal + close + ']'));
            _that.addRenderTask(_that.addAnyOfClose(ref));
        }

    });

    _that.arrayLoopCount += -1;
};

/**
 * @memberOf Schema2Html
 * @description adds render tasks for an item within an array
 *
 * @param {string} id
 * @param {string} name
 * @param {integer} depth
 * @param {integer} index
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopArrayItem = function(id, name, depth, index, schema) {

    // plain old item definition
    if (this.renderMode === 2) {

        var indexVal = this.pack.engine.index;
        var open = this.pack.engine.open;
        var close =  this.pack.engine.close;

        this.addRenderTask(this.addGroupTag('groupItemOpen', id + '-group-' + open + indexVal + close + '-' + name + '[' + open + indexVal + close + ']', depth + 1)); // render tag open
        this.renderLoop(schema, depth + 1, name + '[' + open + indexVal + close + ']');
        this.addRenderTask(this.addGroupTag('groupItemClose', id + '-group-' + open + indexVal + close, name + '[' + open + indexVal + close + ']', depth + 1)); // render tag close

    } else {
        this.addRenderTask(this.addGroupTag('groupItemOpen', id + '-group-' + index, name + '[' + index + ']', depth + 1)); // render tag open
        this.renderLoop(schema, depth + 1, name + '[' + index + ']');
        this.addRenderTask(this.addGroupTag('groupItemClose', id + '-group-' + index, name + '[' + index + ']', depth + 1)); // render tag close
    }
};

/**
 * @memberOf Schema2Html
 * @description adds render tasks for schema#array
 *
 * @param {string} id
 * @param {string} name
 * @param {integer} depth
 * @param {object} schema
 */


Schema2Html.prototype.renderLoopArray = function(id, name, depth, schema) {
    var _that = this,
        minItems = schema.minItems || 1,
        maxItems = schema.maxItems,
        uniqueItems = schema.uniqueItems,
        itemsToRender,
        options,
        dataArr,
        match,
        ref,
        i;


    options = schema.items.options || {};
    dataArr = util.retrieveValue(this.data, name);

    itemsToRender = _.isArray(dataArr) ? dataArr.length : minItems;
    itemsToRender = this.renderMode === 2 ? 1 : itemsToRender;

    this.addRenderTask(this.addGroupTag('groupArrayOpen', id + '-group-many', name, depth, schema)); // open a group

    for (i = 0; i < itemsToRender; i += 1) {
        if (schema.items.$ref) {
            this.renderLoopArrayItem(id, name, depth, i, _that.dependencyCache[schema.items.$ref]);
        } else if (schema.items.anyOf) {
            match = options.matchOn;

            this.renderLoopArrayAnyOf(id, name, depth, i, match, schema.items);

        } else if (schema.items.oneOf) {
            match = options.matchOn;

            schema.items.oneOf.forEach(function(val, index) {
                ref = val.$ref;

                if (ref === match) {
                    this.renderLoop(_that.dependencyCache[ref], depth + 1, name + '[' + index + ']');
                }

            });

        } else {
            this.renderLoopArrayItem(id, name, depth, i, schema.items);
        }
    }

    this.addRenderTask(this.addGroupTag('groupArrayClose', id + '-group-many', name, depth)); // open a group

};

/**
 * @memberOf Schema2Html
 * @description adds an individual render task for the number schema type
 * 
 * @param {string} id html id string
 * @param {string} name html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopNumber = function(id, name, depth, schema) {
    this.renderLoopString(id, name, depth, schema);
};

/**
 * @memberOf Schema2Html
 * @description adds an individual render task for the integer schema type
 *
 * @param {string} id html id string
 * @param {string} name html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopInteger = function(id, name, depth, schema) {
    this.renderLoopString(id, name, depth, schema);
};

/**
 * @memberOf Schema2Html
 * @description adds an individual render task for the boolean schema type
 *
 * @param {string} id html id string
 * @param {string} name html name string
 * @param {integer} depth how deep the item is nested
 * @param {object} schema
 */

Schema2Html.prototype.renderLoopBoolean = function(id, name, depth, schema) {
    this.renderLoopString(id, name, depth, schema);
};

/**
 * @memberOf Schema2Html
 * @description return a function adding a formOpenTag with a single callback that can be added to the control flow, or executed standalone
 *
 * @param {string} id
 * @param {string} endpoint
 * @param {string} method
 */

Schema2Html.prototype.addFormOpen = function(id, endpoint, method) {
    var _that = this,
        pos = this.pos;

    id = this.generateId(id);
    this.pos += 1;

    return function(callback) {
        _that.renderFormTag('formOpen', id, endpoint, method, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description
 *
 * @param {string} dataRef
 */

Schema2Html.prototype.addAnyOfOpen = function(dataRef) {
    var _that = this,
        pos = this.pos;
    this.pos += 1;
    return function(callback) {
        _that.renderAnyOfOpenTag(dataRef, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description
 *
 * @param {string} dataRef
 */

Schema2Html.prototype.addAnyOfClose = function(dataRef) {
    var _that = this,
        pos = this.pos;
    this.pos += 1;
    return function(callback) {
        _that.renderAnyOfCloseTag(dataRef, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description
 *
 * @param {string} dataRef
 * @param {function} callback
 */

Schema2Html.prototype.renderAnyOfOpenTag = function(dataRef, callback) {
    var params = {
        dataRef: dataRef
    };



    this.renderTemplate('anyOfOpen', params, function(err, result) {
        callback(err, result);
    });

};

/**
 * @memberOf Schema2Html
 * @description
 *
 * @param {string} dataRef
 * @param {function} callback
 */

Schema2Html.prototype.renderAnyOfCloseTag = function(dataRef, callback) {
    var params = {
        dataRef: dataRef
    };

    this.renderTemplate('anyOfClose', params, function(err, result) {
        callback(err, result);
    });

};

/**
 * @memberOf Schema2Html
 * @description Renders the opening and closing tags
 *
 * @param {string[formOpen,formClose]} type specify if type is opening or closing
 * @param {number} id html id assigned to form
 * @param {string} form endpoint submission endpoint
 * @param {string} method http method
 * @param {callback}
 */

Schema2Html.prototype.renderFormTag = function(type, id, endpoint, method, callback) {
    var params = {};

    params.id = id;
    params.endpoint = endpoint;
    params.method = method;

    this.renderTemplate(type, params, function(err, result) {
        callback(err, result);
    });

};

/**
 * @memberOf Schema2Html
 * @description return a function adding a formCloseTag with a single callback that can be added to the control flow, or executed standalone
 */

Schema2Html.prototype.addFormClose = function() {
    var _that = this,
        pos = this.pos;

    this.pos += 1;

    return function(callback) {
        _that.renderFormTag('formClose', null, null, null, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description Renders a template based on a path of a given key in the configuration
 *
 * @param {string} key
 * @param {object} params
 * @param {callback} callback
 */

Schema2Html.prototype.renderTemplate = function(key, params, callback) {
    var result = null,
        template = null,
        _that = this;

    if (this.pack.templates[key] === undefined) {
        callback(new Error("Template has no valid path:" + key));
        return null; // exit this is not going to work
    }

    if (typeof (this.pack.templates[key]) !== 'function') {
        this.pack.loadTemplate(key, function(err, compiled) {
            if (err === null) {
                try {
                    _that.pack.templates[key] = compiled;
                   // result = compiled(params);
                    _that.pack.renderTemplate(compiled, params, function(pErr, pResult) {
                        callback(pErr, pResult);
                    });

                } catch (templateErr) {
                    callback(templateErr, result);
                }
            } else {
                callback(err, result);
            }

        });
    } else {
        template = this.pack.templates[key];
        _that.pack.renderTemplate(template, params, function(pErr, pResult) {
            callback(pErr, pResult);
        });
        //result = template(params);
        //callback(null, result);
    }
};

/**
 * @memberOf Schema2Html
 * @description changes a template path
 *
 * @param {string} key
 * @param {string} path
 */

Schema2Html.prototype.changeTemplate = function(key, path) {
    this.config.templates[key] = path;
};

Schema2Html.prototype.renderCustomHandler = function() {};

/**
 * @memberOf Schema2Html
 * @description render group tag open
 *
 * @param {string} id
 * @param {integer} total
 * @param {integer} depth
 */

Schema2Html.prototype.addGroupOpen = function(id, total, depth) {
    var _that = this,
        pos = this.pos;

    this.pos += 1;
    id = this.generateId(id);

    return function(callback) {
        _that.renderGroupOpen(id, total, depth, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description render group tag open
 *
 * @param {string} id
 * @param {integer} total
 * @param {integer} depth
 * @param {function} callback
 */

Schema2Html.prototype.renderGroupOpen = function(id, total, depth, callback) {
    var params = {};

    params.id = id;
    params.total = total || 0;
    params.options = {
        depth: depth
    };

    this.renderTemplate('startGroup', params, function(err, result) {
        callback(err, result);
    });
};

/**
 * @memberOf Schema2Html
 * @description add group tag close
 *
 * @param {string} id
 * @param {integer} depth
 */

Schema2Html.prototype.addGroupClose = function(id, depth) {
    var _that = this,
        pos = this.pos,
        params = {
            id: id
        };

    params.options = {

        depth: depth
    };

    this.pos += 1;

    return function(callback) {
        _that.renderGroupClose(params, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description render group tag close
 *
 * @param {object} params
 * @param {function} callback
 */

Schema2Html.prototype.renderGroupClose = function(params, callback) {
    this.renderTemplate('endGroup', params, function(err, result) {
        callback(err, result);
    });
};

/**
 * @memberOf Schema2Html
 * @description returns a render function for a open/close tag for generic groups
 *
 * @param {string} type
 * @param {string} id
 * @param {string} name
 * @param {integer} depth
 * @param {object} options
 */

Schema2Html.prototype.addGroupTag = function(type, id, name, depth, options) {
    var _that = this,
        pos = this.pos;

    id = this.generateId(id);

    options = options || {};
    options.key = util.dotSyntax(name);
    options.keyName = util.rawName(name);
    options.keyInner = util.innerName(name);
    options.arrayDepth = this.arrayLoopCount;
    this.pos += 1;

    return function(callback) {
        _that.renderGroupTag(id, name, depth, options, type, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @description renders are group open/close tag
 *
 * @param {string} id
 * @param {string} name
 * @param {integer} depth
 * @param {object} options
 * @param {string} type
 * @param {function} callback
 * 
 */

Schema2Html.prototype.renderGroupTag = function(id, name, depth, options, type, callback) {
    var params = {
        id: id,
        name: name,
        depth: depth,
        options: options || {}
    };

    params.options.depth = depth;

    this.renderTemplate(type, params, function(err, result) {
        callback(err, result);
    });
};

/**
 * @memberOf Schema2Html
 * @description Appends rendered html to the internal html variable
 *
 * @param {string} html
 * @param {integer} pos
 */

Schema2Html.prototype.appendHtml = function(html, pos) {
    this.html[pos] = html;
};

/**
 * @memberOf Schema2Html
 * @description Append a string to the dummy html output
 */

Schema2Html.prototype.appendDummyHtml = function(html, pos) {
    this.html[pos] = html;
};

/**
 * @memberOf Schema2Html
 * @description return a function that renders string template based on input variables
 *
 * @param {string} id
 * @param {string} name
 * @param {*} val
 * @param {string} label
 * @param {array} src
 * @param {object} options
 * @param {boolean} required
 */

Schema2Html.prototype.addString = function(id, name, val, label, src, options, required) {
    var _that = this,
        pos = this.pos;

    this.pos += 1;

    return function(callback) {
        _that.renderString(id, name, val, label, src, options, required, function(err, result) {
            _that.appendHtml(result, pos);
            callback(err, result);
        });
    };
};

/**
 * @memberOf Schema2Html
 * @description Render string template
 *
 * @param {string} id
 * @param {string} name
 * @param {*} val
 * @param {string} label
 * @param {array} src
 * @param {object} options
 * @param {boolean} required
 * @param {function} callback
 */

Schema2Html.prototype.renderString = function(id, name, val, label, src, options, required, callback) {
    var params = {},
        template = 'textfield';

    params.id = this.generateId(id);
    params.name = name;
    params.val = val;
    params.src = src;
    params.label = label;
    params.options = options || {};
    params.required = required || false;
    params.options.keyName = util.rawName(name);
    params.options.keyInner = util.innerName(name, params.options.depth || 0);
    params.options.arrayDepth = this.arrayLoopCount;
    params.datasrc = params.options.datasrc ? this.dependencyCache[params.options.datasrc] : null;

    template = params.options.format || template;

    this.renderTemplate(template, params, function(err, result) {
        callback(err, result);
    });
};

/**
 * @memberOf Schema2Html
 * @description Push a task into what will make up the rendering loop
 *
 * @param {function} func
 */

Schema2Html.prototype.addRenderTask = function(func) {
    this.funcs.push(func);
};

/**
 * @memberOf Schema2Html
 * @description Generate a valid html id for use in the dom
 *
 * @param {string} scope
 */

Schema2Html.prototype.generateId = function(scope) {
    scope = scope || "";
    return scope !== null ? scope.toLowerCase().split('../').join('-@-').split('[').join('-').split(']').join('').split('.').join('-').split(' ').join('-').split('-@-').join('../') : null;
};

/**
 * @memberOf Schema2Html
 * @description Genetate a valid form name
 *
 * @param {string} preScope
 * @param {string} newScope
 * 
 */

Schema2Html.prototype.generateName = function(preScope, newScope) {
    var name;

    if (preScope !== null) {
        name =  preScope + '[' + newScope + ']';
    } else {
        name = newScope;
    }

    return name;
};


module.exports = Schema2Html;