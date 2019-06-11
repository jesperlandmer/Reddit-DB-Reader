/**
 * Tests for the Database.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.2.0
 */

"use strict";

const expect = require("chai").expect;
const dbTest = require("../../server/Model/Users");

describe("Database", () => {

    const user = {
        id: "2345234523451345",
        email: "test@test.com",
        name: "Foo Foo",
        first_name: "Foo",
        middle_name: "test",
        last_name: "Foo",
        gender: "female",
        picture: "image/picture"
    };

    const userUpdated = {
        id: "2345234523451345",
        email: "test@test.com",
        name: "Foo Foo",
        first_name: "Foo",
        middle_name: "test",
        last_name: "Bar", // Altered last name
        gender: "female",
        picture: "image/picture"
    };

    it("should CONNECT", function(done) {
        require("../../server/Model/Users");
        done();
    });

    it("should ADD", function(done) {

        dbTest.addOne(user, function(err, result, id) {

            if (err) {
                done(err)
            }

            if (result) {

                console.log(id);
                expect(result).to.be.an("object");
                for (var key in result[0]) {
                    if (result[0][key].length > 0) {
                        expect(result[0][key]).to.equal(user[key]);
                    }
                }

                done();
            }
        });
    });

    it("should FIND ONE", function(done) {

        dbTest.findOne(user, function(err, result) {

            if (err) {
                done(err);
            }

            if (result) {

                expect(result[0]).to.be.an("object");
                for (var key in result[0]) {
                    if (result[0][key].length > 0) {
                        expect(result[0][key]).to.equal(user[key]);
                    }
                }

                done();
            }
        });
    });

    it("should FIND ALL", function(done) {

        dbTest.findAll({}, function(err, result) {

            if (err) {
                done(err);
            }

            if (result) {

                expect(result).to.be.instanceof(Array);
                expect(result).to.have.length.of.at.least(0);
                done();
            }
        });
    });

    /**
     * Should Edit works, but needs to alter initial user & updated user on each test
     */
    it("should EDIT", function(done) {

        // Edited user data, except for ID
        dbTest.editOne(userUpdated, function(err, data, result) {

            if (err) {
                throw err
            }

            if (result) {

                expect(result.constructor.name).to.equal("OkPacket");
                done();
            }
        });
    });

    it("should DELETE", function(done) {

        dbTest.deleteOne(userUpdated, function(err, result) {

            if (err) {
                done(err)
            }

            if (result) {

                expect(result.constructor.name).to.equal("OkPacket");
                done();
            }
        });
    });

});
