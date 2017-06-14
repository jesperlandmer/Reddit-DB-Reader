/**
 * Tests for the Get Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const GetEventResource = require("../../../server/routes/resources/events/GetEventResource");
const activity = {
        id: 78,
        host_id: "10212700912096491",
        event_name: "Bollspel",
        description: "Vi spelar kast med liten boll borta vid vattnet!",
        location: "Lindholmen, Gothenburg, Sweden",
        latLng: "{\"lat\":57.706968,\"lng\":11.938017}",
        date: "19 May 2017",
        time: "14:00",
        needed: "3",
        tags: ["Bollspel", "tv-spel"],
        participants_id: "[\"10156040269412738\"]" };

describe("GetEventResource", function() {

    describe("Get Event Data", function() {

        it("Module should be promisified", function(done) {

            expect(GetEventResource()).to.be.a("promise");
            done()
        });

        it("Response should be an object", function(done) {

            GetEventResource(activity)
                .then(response => {
                    should.exist(response);
                    expect(response).to.be.an("object");

                    done()
                })
                .catch(e => {throw e});
        });

        it("No key should be null", function(done) {

            GetEventResource(activity)
                .then(response => {
                    for (var key in response) {

                        expect(response[key]).to.not.be.null;
                    }

                    done()
                })
                .catch(e => {throw e});
        });

        it("Should be fulfilled", function(done) {
            var promise = GetEventResource(activity);
            promise.should.be.fulfilled.and.notify(done);
        });

        it("Should be rejected", function(done) {
            var promise = GetEventResource();
            promise.should.be.rejected.and.notify(done);
        });

        it("Should have correct properties", function(done) {

            GetEventResource(activity)
                .then(response => {
                    expect(response).to.have.all.keys("id", "host", "host_id", "user", "picture", "title", "description", "date",
                        "time", "address", "needed", "tags", "participants", "participants_id");
                    done()
                })
                .catch(e => {throw e});
        });
    });
});
