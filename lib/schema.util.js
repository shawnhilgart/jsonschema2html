/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var util = {
    
    dotSyntax: function(s) {
        if(typeof s === 'string') { 
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');
        }

        return s;       
    },
    
    rawName: function(s) {
        var r;

        if(typeof s === 'string') { 
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');
            
        }

        return s; 
    },

    innerName: function(s,d) {
        var r;

        if(typeof s === 'string') { 
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');
            
            r = s.split(']');
            s = r[r.length-1];
            s = s.indexOf('.') === 0 ? s.substr(1,s.length-1) : s;

        }

        return s; 
    },

    /**
     * @memberOf Schema2Html
     * @description Retreive a value from object based on dot notation
     */

    retrieveValue: function(o, s, t) {
        if (o && typeof o !== 'string') {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot

            if(t){
                return '{{' + "data." + s + '}}';
            }

            var a = s.split('.');
            if (!t) {
                while (a.length) {
                    var n = a.shift();
                    if (n in o) {
                        o = o[n];
                    } else {
                        return;
                    }
                }
            }
            return t === true ? '{{' + "data." + s + '}}' : o;
        } else {
            return null;
        }
    }, 


    repeat: function(num,dp) {
        if (num > 1) { 
            return new Array( num ).join( dp );
        } else {
            return "";
        }
    }

}

module.exports = util;





