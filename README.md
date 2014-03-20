jsonschema2html
===============

**Library is still under active development, do not use in production**

## Overview

Schema2Html is a Javascript utility for rendering html forms based on a JSON Schema file. 

## Dependency Resolution

The Parser can resolve dependencies on other schema files via http, https, definitions and local fs. Dependencies are first scanned and loaded into a dependency cache before the form is output, html will not be output if an unresolved dependency is met.

## Form Packs/Rendering

The Parsed accepts an options pack attribute that can be used to modify the output of the parser, a few examples can be seen below. An explanation of the form pack concept can be found at [Building A Form Pack](https://github.com/shawnhilgart/jsonschema2html/wiki/Building-A-Form-Pack)

* https://github.com/shawnhilgart/jsonschema2html-handlebars-pack
* https://github.com/shawnhilgart/jsonschema2html-txt-pack

## Usage

### Basic Example

In the following example we use the default schema parser settings to output a simple form.

```
var Schema2Html = require('jsonschema2html');
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

```

### Outputs

```
<form method='POST' action='' enctype='multipart/form-data' id="sample">
<div id='group-sample' class="">
    <h2></h2>
    <div>
        <label for='author'>author </label>
        <input type='text' name='author' id='author' value='' class="" />
    </div>
    <div>
        <label for='booktitle'>bookTitle </label>
        <input type='text' name='bookTitle' id='booktitle' value='' class="" />
    </div>
</div> 
<input type="submit" value="Save" class="button form-save-button" /> 
</form>

```

