/**
 * Tests for the get event routing
 * Expecting status 302 because of oAuth-authentications
 * More exquisite tests will be made on Postman(https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const app = require("../../app").app;
const request = require("supertest");

describe("Add Event Resource", function() {

    describe("GET activity callback", function() {

        it("Redirects to application", function(done) {

            request(app)
                .get("/mendr/api/00")
                .set("Accept", "application/json")
                .expect(302, done);
        });
    });
});
