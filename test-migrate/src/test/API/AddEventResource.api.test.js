/**
 * Tests for the add event routing
 * Expecting status 302 because of oAuth-authentications
 * More exquisite tests will be made on Postman(https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const app = require("../../app").app;
const request = require("supertest");
const expect = require("chai").expect;
const newEvent = {
    event_name: "Test",
    location: "Testvägen, Arlöv, Sverige",
    description: "Test",
    date: "0001-01-01",
    time: "00:00",
    needed: "1",
    tags: "test",
    host_id: "10212700912096491" };

/**
 * OBS OAUTH PROBLEMS - HTTP-TESTS WILL BE PERFORMED ON POSTMAN INSTEAD
 *
 * To avoid checking for authorization header, set this in route
 router.route("/activity")
 .get(function (req, res) {
            res.render("../views/app", {user: req.user, activityInstance: true});
            res.status(200);
        })

 .post(function (req, res) {

            res.status(200);
            res.end();
        });
 */

describe("Add Event Resource", function() {

    describe("GET activity callback", function() {

        it("Redirects to application", function(done) {

            request(app)
                .get("/mendr/api/activity") // Change to only "/activity" to avoid checkAuth
                .set("Accept", "application/json")
                .expect(302, done);
        });
    });

    describe("POST activity", function() {

        this.timeout(10000);

        it("Redirects to application", function(done) {

            request(app)
                .post("/mendr/api/activity") // Change to only "/activity" to avoid checkAuth
                .type("form")
                .send(newEvent)
                .set("Accept", "application/json")
                .expect(302)
                .end(function(err,result) {
                    if (err) { throw err }

                    expect(result.body).to.be.an("object");
                    /**
                     * IF ROUTING IS MODIFIED & OAUTH-REQUIREMENT IS OFF
                     * expect(result.body).to.deep.equal(newEvent);
                     */
                    done();
                })
        });
    });
});
