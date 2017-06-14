/**
 * Tests for the Add Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const eventDB = require("../../../server/Model/Events");
const expect = require("chai").expect;
const AddEventResource = require("../../../server/routes/resources/events/AddEventResource");
const GetCoordinatesResource = require("../../../server/routes/resources/geocode/GetCoordinatesResource");
const testInput = {
    testCondition: true,
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

describe("AddEventResource", function() {

    describe("Add event resource to DB with Promise", function() {

        it("Module should be promisified", function(done) {

            expect(AddEventResource()).to.be.a("promise");
            expect(GetCoordinatesResource(testInput)).to.be.a("promise");
            done()
        });

        it("Should be rejected", function(done) {
            var promise = AddEventResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should add event resource", function(done) {

            GetCoordinatesResource(testInput)
                .then(response => {
                    return AddEventResource(testInput, response).should.be.fulfilled;
                })
                .then(result => {
                    expect(result).to.be.an("object");
                    expect(result.constructor.name).to.equal("OkPacket");
                    expect(result.affectedRows).to.be.at.least(1);
                    done()
                });

        });

        it("Should delete event resource", function(done) {

            eventDB.deleteOne(testInput.body, function(err, result) {

                if (err) {
                    throw new Error(err);
                }

                expect(result.constructor.name).to.equal("OkPacket");
                done()
            });
        });
    });
});
