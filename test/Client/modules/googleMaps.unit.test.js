/**
 * Tests for the Facebook Oauth Redirection.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const googleMap = require("../../../client/js/app/mapResource");
const settings = require("../../../client/js/tools/settings");
const Vue = require("vue");
require("jsdom-global")();
const expect = require("chai").expect;

describe("Application Map Functions", function() {

    describe("googleMap Component", function() {

        before(function() {
            this.jsdom = require("jsdom-global")()
        });

        after(function() {
            this.jsdom()
        });

        it("Should be a Vue constructor", function(done) {

            var googleMapResult = googleMap(settings);
            for (var key in googleMapResult) {
                if (key in new Vue) {
                    expect(new Vue).to.have.property(key);
                }
            }

            done();
        });

        it("Should throw Error with parameter fail", function(done) {

            expect(function() {
                googleMap();
            }).to.throw("No parameter");
            done();
        });

        it("Should find HTML elements after timeout", function(done) {

            setTimeout(function() {
                document.body.innerHTML = "<div class='gm-style-iw' style='display: block'>Test #1</div>";
                document.body.innerHTML += "<div class='gm-style-iw' style='display: block'>Test #2</div>";
            }, 1000);

            setInterval(function() {
                var testData = googleMap(settings).infoWindowStylize("TEST");

                if (Object.keys(testData).length > 0) {
                    expect(testData).to.be.an("object");
                    expect(Object.keys(testData)).to.have.length.of.at.least(2);
                    clearInterval(this);
                    done();
                }
            }, 500);
        });
    });
});
