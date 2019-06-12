/**
 * Tests for the Get Chats Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const GetChatsResource = require("../../../server/routes/resources/chat/GetChatsResource");

describe("GetChatsResource", function() {

    describe("Get Chats Data from DB using Promise", function() {

        it("Module should be promisified", function(done) {

            expect(GetChatsResource()).to.be.a("promise");
            done()
        });

        it("Should be fulfilled", function(done) {
            var promise = GetChatsResource({id: "10212700912096491"});
            promise.should.be.fulfilled.and.notify(done)
        });

        it("Should be rejected", function(done) {
            var promise = GetChatsResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should get chats data", function(done) {

            GetChatsResource({id: "10212700912096491"}).should.be.fulfilled
                .then(response => {
                    expect(response).to.be.an("array");

                    if (response.length > 0) {
                        expect(response[0]).to.have.all.keys("activity_id", "id", "name", "participants_id");
                    }

                    done()
                })
                .catch(e => console.error(e))
        });
    });
});
