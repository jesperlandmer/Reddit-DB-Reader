/**
 * Tests for the Get Tags Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const GetTagsResource = require("../../../server/routes/resources/tags/GetTagsResource");

describe("GetTagsResource", function() {

    describe("Get Tags Data", function() {

        it("Module should be promisified", function(done) {

            expect(GetTagsResource()).to.be.a("promise");
            done()
        });

        it("Should be fulfilled", function(done) {
            var promise = GetTagsResource("78");
            promise.should.be.fulfilled.and.notify(done);
        });

        it("Response should be an array of tags", function(done) {

            GetTagsResource()
                .then(response => {
                    expect(response).to.be.an.instanceof(Array);
                    done()
                })
                .catch(e => {throw e});
        });
    });
});
