/**
 * Tests for the Facebook Oauth Redirection.
 *
 * @author Jesper Landmér Pedersen
 * @version 2.0.1
 */

"use strict";

const app = require("../../app").app;
const request = require("supertest");
const assert = require("assert");
const virtualBrowser = require("zombie");

describe("Facebook Login", function() {
    describe("Checking whether application redirects to FB Oauth", function() {

        this.timeout(12000);

        it("Redirects to login", function(done) {

            /**
             * OBS - REMEMBER TO SET CORRECT ADDRESS
             */
            virtualBrowser.visit("https://72782f81.ngrok.io/auth/facebook", function(err, browser) {
                if (err) {
                    throw err;
                }

                browser.assert.success();
                assert.equal(browser.location.pathname, "/login.php");

                done();
            });
        });
    });
});

describe("Facebook Callback", function() {

    describe("GET FB callback", function() {

        it("Redirects to application", function(done) {

            request(app)
                .get("/auth/facebook/callback")
                .expect(302, done);
        });
    });
});
