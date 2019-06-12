/**
 * Tests for the Handle Event Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const userDB = require("../../../server/Model/Users");
const HandleEventResource = require("../../../server/routes/resources/events/HandleEventResource");
const AddEventResource = require("../../../server/routes/resources/events/AddEventResource");
const GetCoordinatesResource = require("../../../server/routes/resources/geocode/GetCoordinatesResource");

// Test Data
const user = {
    id: "86098609789",
    email: "test@test.com",
    name: "Foo Foo",
    first_name: "Foo",
    middle_name: "test",
    last_name: "Foo",
    gender: "female",
    picture: "image/picture"
};
const reqJoin = {
    user: user,
    body: {join: "Join"}
};
const testActivityJoin = {
    event_name: "Test",
    location: "Testvägen, Arlöv, Sverige",
    description: "Test",
    date: "0001-01-01",
    time: "00:00",
    needed: "1",
    tags: JSON.stringify(["Fotboll"]),
    host_id: "10212700912096491"};
const reqCancel = {
    user: user,
    body: {cancel: "Cancel"}
};
const testActivityCancel = {
    event_name: "Test",
    location: "Testvägen, Arlöv, Sverige",
    description: "Test",
    date: "0001-01-01",
    time: "00:00",
    needed: "1",
    tags: JSON.stringify(["Fotboll"]),
    host_id: "10212700912096491",
    participants_id: "[\"86098609789\"]"};

describe("HandleEventResource", function() {

    // Set up fake user
    userDB.addOne(user, function(err, result, id) {

        if (err) {
            throw err;
        }
    });

    describe("Should be able to join or cancel activity", function() {

        it("Module should be promisified", function(done) {

            expect(HandleEventResource()).to.be.a("promise");
            done()
        });

        it("User should join activity", function(done) {

            var promise = HandleEventResource(reqJoin, testActivityJoin);
            promise.should.be.fulfilled.and.notify(done);
        });

        it("User should cancel activity", function(done) {

            var promise = HandleEventResource(reqCancel, testActivityCancel);
            promise.should.be.fulfilled.and.notify(done);
        });

        it("Activity participants value should be changed on join", function(done) {

            HandleEventResource(reqJoin, testActivityJoin)
            .then(response => {
                expect(response).to.be.an("object");
                response.participants_id = JSON.parse(response.participants_id);

                expect(response.participants_id).to.be.an.instanceof(Array);
                expect(response.participants_id).to.include.members([user.id]);
                done()
            })
            .catch(e => {throw e});
        });

        it("Activity participants value should be changed on cancel", function(done) {

            HandleEventResource(reqCancel, testActivityCancel)
                .then(response => {
                    expect(response).to.be.an("object");
                    response.participants_id = JSON.parse(response.participants_id);

                    expect(response.participants_id).to.be.an.instanceof(Array);
                    expect(response.participants_id).to.include.members([]);
                    done()
                })
                .catch(e => {throw e});
        });

        it("Should not be able to join already participated event", function(done) {

            var promise = HandleEventResource(reqJoin, testActivityCancel); // testActivityCancel contains participant id for test user
            promise.should.be.rejected.and.notify(done);
        });

        it("should delete test user", function(done) {

            userDB.deleteOne(user, function(err, result) {

                if (err) {
                    throw err;
                }

                done()
            });
        });
    });
});
