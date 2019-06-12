/**
 * Tests for the Find Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const FindEventResource = require("../../../server/routes/resources/events/FindEventResource");

describe("FindEventResource", function() {

    describe("Find Event Data", function() {

        it("Module should be promisified", function(done) {

            expect(FindEventResource()).to.be.a("promise");
            done()
        });

        it("Should be fulfilled", function(done) {
            var promise = FindEventResource("78");
            promise.should.be.fulfilled.and.notify(done);
        });

        it("Should be rejected", function(done) {
            var promise = FindEventResource();
            promise.should.be.rejected.and.notify(done);
        });

        it("Response should be an object", function(done) {

            FindEventResource("78") // Type in valid activity id from database
                .then(response => {
                    should.exist(response);
                    expect(response).to.be.an("object");
                    expect(response).to.have.all.keys("id", "host_id", "event_name", "description",
                    "location", "latLng", "date", "time", "needed", "tags", "participants_id");
                    done()
                })
                .catch(e => {throw e});
        });
    });
});
