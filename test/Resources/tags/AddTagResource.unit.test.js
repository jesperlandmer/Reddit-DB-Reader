/**
 * Tests for the Add Tag Resource.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const chaiAsPromised = require("chai-as-promised");
require("chai").use(chaiAsPromised);
const expect = require("chai").expect;
const should = require("chai").should();
const tagsDB = require("../../../server/Model/Tags");
const AddTagResource = require("../../../server/routes/resources/tags/AddTagResource");
const tags = {
    body: {
        tags: JSON.stringify(["test"])
    }
};

describe("AddTagResource", function() {

    describe("Add Tag Data to DB", function() {

        it("Module should be promisified", function(done) {

            expect(AddTagResource()).to.be.a("promise");
            done()
        });

        it("Should be fulfilled", function(done) {
            var promise = AddTagResource(tags);
            promise.should.be.fulfilled.and.notify(done);
        });

        it("Should be rejected", function(done) {
            var promise = AddTagResource();
            promise.should.be.rejected.and.notify(done)
        });

        it("Should add a tag resource", function(done) {

            AddTagResource(tags)
                .then(tagData => {
                    should.exist(tagData);
                    expect(tagData).to.equal(tags.body.tags);
                    done()
                });
        });

        it("Should delete tag resource", function(done) {

            tagsDB.deleteOne({description: JSON.parse(tags.body.tags)}, function(err, result) {

                if (err) {
                    throw new Error(err);
                }

                expect(result.constructor.name).to.equal("OkPacket");
                expect(result.affectedRows).to.equal(1);
                done()
            });
        });
    });
});
