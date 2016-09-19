var _ = require('lodash');
var _filterKeys = require('./lodash-filter-keys');

function textToJSON(jsonParser, text) {
    return jsonParser.parse(text);
}

function jsonToText(jsonParser, json, indent) {
    return jsonParser.stringify(json, undefined, indent);
}

function filterJSON(json, options) {
   return  _.filterKeysDeepBy(json, options);
}

exports.textToJSON = textToJSON;
exports.jsonToText = jsonToText;
exports.filterJSON = filterJSON;
