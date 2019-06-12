/**
 * Tests for the Get Messages Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const chatsDB = require("../../../server/Model/Chat");
const messagesDB = require("../../../server/Model/Message");
const GetMessagesResource = require("../../../server/routes/resources/chat/GetMessagesResource");
const AddEventResource = require("../../../server/routes/resources/events/AddEventResource");
const DeleteEventResource = require("../../../server/routes/resources/events/DeleteEventResource");
const GetCoordinatesResource = require("../../../server/routes/resources/geocode/GetCoordinatesResource");
const AddChatResource = require("../../../server/routes/resources/chat/AddChatResource");
const testInput = {
    body: {
        event_name: "Test",
        location: "Testvägen, Arlöv, Sverige",
        description: "Test",
        date: "0001-01-01",
        time: "00:00",
        needed: "1",
        tags: JSON.stringify(["Fotboll"]),
        host_id: "10212700912096491",
        participants_id: JSON.stringify(["10212700912096492"])}
};

describe("GetMessagesResource", function() {

    describe("Get messages referenced to chat", function() {

        it("Module should be promisified", function(done) {

            expect(GetMessagesResource()).to.be.a("promise");
            done()
        });

        it("Should be rejected", function(done) {
            var promise = GetMessagesResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should get messages data", function(done) {

            GetCoordinatesResource(testInput)
                .then(response => AddEventResource(testInput, response))
                .then(id => AddChatResource(id, testInput).should.be.fulfilled)
                .then(packet => {

                    // add message to chat resource
                    var addMessagePromise = new Promise((resolve, reject) => {
                        messagesDB.addOne({
                            message_sender_id: "86098609789",
                            message_datetime: new Date(),
                            message_text: "This is a test",
                            message_chat_id: packet.result.insertId
                        }, function(err, result) {

                            if (err) {
                                throw new Error(err);
                            }

                            expect(result.constructor.name).to.equal("OkPacket");
                            expect(result.affectedRows).to.be.at.least(1);
                            resolve(result);
                        });
                    });

                    // delete chat resource
                    var deleteChatPromise = new Promise((resolve, reject) => {
                        chatsDB.deleteOne({id: packet.result.insertId}, function(err, result) {

                            if (err) {
                                throw new Error(err);
                            }

                            expect(result.constructor.name).to.equal("OkPacket");
                            expect(result.affectedRows).to.be.at.least(1);
                            resolve(result);
                        });
                    });

                    return Promise.all([
                        addMessagePromise,
                        GetMessagesResource({id: packet.result.insertId}).should.be.fulfilled,
                        deleteChatPromise,
                        DeleteEventResource(packet.id[0][Object.keys(packet.id[0])[0]]).should.be.fulfilled.and.notify(done)])})
                .catch(e => console.error(e))
        });
    });
});
