/**
 * Tests for the Facebook Oauth Redirection.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const TagInputComponent = require("../../../client/js/components/TagInput").options;
const expect = require("chai").expect;
require("jsdom-global")();

describe("Tag Input Component", function() {

    before(function() {
        this.jsdom = require("jsdom-global")()
    });

    after(function() {
        this.jsdom()
    });

    describe("Options & Templates", function() {

        it("Element tag should be named 'tag-editor-input'", function(done) {

            expect(TagInputComponent.name).to.equal("tag-editor-input");
            done();
        });

        it("Replace should be true", function(done) {

            expect(TagInputComponent.replace).to.be.true;
            done();
        });

        it("Template should be HTML-element", function(done) {

            document.body.innerHTML = TagInputComponent.template;
            expect(document.querySelector(".tag-field").constructor.name).to.equal("HTMLDivElement");
            done();
        });
    });

    describe("Methods", function() {

        it("Should be functions", function(done) {

            for (var method in TagInputComponent.methods) {
                expect(typeof TagInputComponent.methods[method]).to.equal("function");
            }

            done();
        });

        it("clickEvent should be correct", function(done) {

            expect(TagInputComponent.methods.clickEvent).to.not.throw(/good function/);
            done();
        });

        it("keyCheck should be correct", function(done) {

            expect(TagInputComponent.methods.keyCheck).to.not.throw(/good function/);
            done();
        });

        it("render should be correct", function(done) {

            expect(TagInputComponent.methods.render).to.not.throw(/good function/);
            done();
        });
    });
});
