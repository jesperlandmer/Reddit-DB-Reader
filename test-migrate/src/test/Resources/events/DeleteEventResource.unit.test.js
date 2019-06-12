/**
 * Tests for the Delete Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.1
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const AddEventResource = require("../../../server/routes/resources/events/AddEventResource");
const DeleteEventResource = require("../../../server/routes/resources/events/DeleteEventResource");
const GetCoordinatesResource = require("../../../server/routes/resources/geocode/GetCoordinatesResource");
const testInput = {
    body: {
        event_name: "Test",
        location: "Testvägen, Arlöv, Sverige",
        description: "Test",
        date: "0001-01-01",
        time: "00:00",
        needed: "1",
        tags: JSON.stringify(["Fotboll"]),
        host_id: "10212700912096491" }
};

describe("DeleteEventResource", function() {

    describe("Delete event resource from DB with Promise", function() {

        it("Module should be promisified", function(done) {

            expect(DeleteEventResource()).to.be.a("promise");
            done()
        });

        it("Should be rejected", function(done) {
            var promise = DeleteEventResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should delete event resource", function(done) {

            GetCoordinatesResource(testInput)
                .then(response => AddEventResource(testInput, response))
                .then(id => DeleteEventResource(id[0][Object.keys(id[0])[0]]).should.be.fulfilled.and.notify(done))

        });
    });
});
