/* jslint node: true */
/* global describe, it, expect */

"use strict";

var testUtil = require("./test-util");

describe("index.js", function () {

    it("- test", function (done) {
        testUtil.onPage(function(window) {
            var windowHandle = require("../index");

            windowHandle.getWindow(function(theWindow) {
            	expect(theWindow).toBe(window);
            	done();
            }, 1000);

            windowHandle.setWindow(window);
        });
    });
});
