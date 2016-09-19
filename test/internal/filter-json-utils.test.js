/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

var expect = require('chai').expect;
var filterer = require('../../lib/filter-json-utils');

describe("Filter-JSON:", function () {

    describe("JSON to Text:", function () {
        it("JSON", function () {
            var jsonParser = JSON;
            var obj = { c: 3, b: 2, a: 1 };
            var text = filterer.jsonToText(jsonParser, obj);
            expect(text).to.equal("{\"c\":3,\"b\":2,\"a\":1}");
        });

        it("JSON5", function () {
            var jsonParser = require('JSON5');
            var obj = { c: 3, b: 2, a: 1 };
            var text = filterer.jsonToText(jsonParser, obj);
            expect(text).to.equal("{c:3,b:2,a:1}");
        });
    });

    describe("Text to JSON:", function () {
        it("JSON", function () {
            var jsonParser = JSON;
            var text = "{\"c\":3,\"b\":2,\"a\":1}";
            var obj = filterer.textToJSON(jsonParser, text);
            expect(obj).to.deep.equal({ c: 3, b: 2, a: 1 });
        });

        it("JSON5", function () {
            var jsonParser = require('JSON5');
            var text = "{c:3,b:2,a:1}";
            var obj = filterer.textToJSON(jsonParser, text);
            expect(obj).to.deep.equal({ c: 3, b: 2, a: 1 });
        });
    });

    describe("Filter JSON:", function () {
        it("Simple Exclude", function () {
            var obj = { c: 3, b: 2, a: 1 };
            var filteredObj = filterer.filterJSON(obj, {excludeKeys: ['c']});
            expect(filteredObj).to.deep.equal({b:2, a:1});

            var jsonParser = require('JSON5');
            var text = filterer.jsonToText(jsonParser, filteredObj);
            expect(text).to.equal("{b:2,c:3}");
        });

        it("Nested", function () {
            var obj = { c: { b: 4, a: 3 }, b: 2, a: 1 };
            var filteredObj = filterer.filterJSON(obj, {excludeKeys: ['a']});
            expect(filteredObj).to.deep.equal({ c: { b: 4 }, b: 2 });

            var jsonParser = require('JSON5');
            var text = filterer.jsonToText(jsonParser, filteredObj);
            expect(text).to.equal("{c:{b:4},b:2}");
        });
    });
});
