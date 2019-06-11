/**
 * Tests for the Get Sender Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const GetSenderResource = require("../../../server/routes/resources/chat/GetSenderResource");

describe("GetSenderResource", function() {

    describe("Get Message Sender Data using Promise", function() {

        it("Module should be promisified", function(done) {

            expect(GetSenderResource()).to.be.a("promise");
            done()
        });

        it("Should be rejected", function(done) {
            var promise = GetSenderResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should get sender resource", function(done) {

            GetSenderResource({message_sender_id: "10212700912096491"})
                .then(sender => {
                    expect(sender).to.be.an("object");
                    expect(sender).to.have.all.keys("message", "user");
                    expect(sender.user).to.be.an("object").that.has.all.keys("id", "email", "name", "last_name",
                        "middle_name", "first_name", "gender", "picture");
                    done()
                })
        });
    });
});
