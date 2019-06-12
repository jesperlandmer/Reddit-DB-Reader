/**
 * Tests for the Edit Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.1
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const EditEventResource = require("../../../server/routes/resources/events/EditEventResource");
const GetCoordinatesResource = require("../../../server/routes/resources/geocode/GetCoordinatesResource");
const testInput = {
    body: {
        event_name: "New Edited Title", // Edited title
        location: "Testvägen, Arlöv, Sverige",
        description: "Test",
        date: "0001-01-01",
        time: "00:00",
        needed: "5", // Edited number
        tags: JSON.stringify(["Fotboll"]),
        host_id: "10212700912096491" }
};

describe("EditEventResource", function() {

    describe("Edit event resource from DB with Promise", function() {

        it("Module should be promisified", function(done) {

            expect(EditEventResource()).to.be.a("promise");
            done()
        });

        it("Should be rejected", function(done) {
            var promise = EditEventResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should edit event resource", function(done) {

            GetCoordinatesResource(testInput)
                .then(response => {
                    return EditEventResource(testInput, response).should.be.fulfilled;
                })
                .then(result => {
                    expect(result).to.deep.equal(testInput.body);
                    done()
                });

        });
    });
});
