/**
 * Tests for the Facebook Oauth Redirection.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const homePage = require("../../../client/js/app/homeResource");
const settings = require("../../../client/js/tools/settings");
const Vue = require("vue");
require('jsdom-global')();
const expect = require("chai").expect;

describe("Home Page", function() {

    describe("homePage Component", function() {

        it("Should be a Vue constructor", function(done) {

            var homePageResult = homePage(settings);
            for (var key in homePageResult) {
                if (key in new Vue) {
                    expect(new Vue).to.have.property(key);
                }
            }
            done();
        });

        it("Should throw Error with parameter fail", function(done) {

            expect(function(){
                homePage();
            }).to.throw("No parameter");
            done();
        });

        it("Should cycle through image array", function(done) {

            homePage(settings);
            var cycleResults = homePage.cycle();

            expect(cycleResults.styleObject).to.be.an("object");
            expect(cycleResults.image_array).to.have.length.of.at.least(1);
            done();
        });

        it("Should present activities by condition", function(done) {

            var matrixResults;
            var testData = [200, 300, 20000, 40000];

            homePage(settings);
            matrixResults = homePage.callback(20000, "TEST");
            expect(matrixResults).to.be.below(1);

            matrixResults = homePage.callback(100, "TEST");
            expect(matrixResults).to.be.at.least(1);

            testData.forEach(function (distance) {
                matrixResults = homePage.callback(distance, "TEST");
            });
            expect(matrixResults).to.be.at.least(2);
            expect(matrixResults).to.be.below(4);

            done();
        });
    });
});
