/**
 * Unit tests for local strategy Facebook Passport.
 *
 * @author Jesper Landmér Pedersen
 * @version 1.0.0
 */

"use strict";

const chai = require("chai");
const expect = chai.expect;
const FacebookStrategy = require("passport-facebook").Strategy;

chai.use(require("chai-passport-strategy"));

describe("Passport-Facebook", function() {
    describe("Token Strategy", function() {

        var strategy = new FacebookStrategy({
                clientID: process.env.APP_ID,
                clientSecret: process.env.APP_SECRET
            },
            function(accessToken, refreshToken, profile, done) {

                done(null, profile);
            });

        it("should be named facebook", function() {
            expect(strategy.name).to.equal("facebook");
        });

        describe("Invalid Input", function() {
            it("should throw error", function() {
                expect(function() {
                    var strategy = new FacebookStrategy("", function() {});
                }).to.throw(Error);
            });
        });

        describe("Authorization Request", function() {

            it("should be authenticated", function() {
                var strategy = new FacebookStrategy({
                        clientID: process.env.APP_ID,
                        clientSecret: process.env.APP_SECRET
                    },
                    function(accessToken, refreshToken, profile, done) {

                        done(null, profile);
                    });

                before(function(done) {
                    chai.passport.use(strategy)
                        .redirect(function(u) {
                            url = u;
                            done();
                        })
                        .req(function(req) {
                        })
                        .authenticate();
                });

                it("should be redirected", function() {
                    expect(url).to.equal("https://www.facebook.com/dialog/oauth?response_type=code&client_id=" + process.env.APP_ID);
                });
            });

            it("should provide profile data", function() {
                var profile;

                var strategy = new FacebookStrategy({
                        clientID: process.env.APP_ID,
                        clientSecret: process.env.APP_SECRET
                    },
                    function(accessToken, refreshToken, profile, done) {

                        done(null, profile);
                    });

                before(function(done) {
                    strategy.userProfile("token", function(err, p) {
                        if (err) { return done(err); }

                        profile = p;
                        done();
                    });
                });

                it("should parse profile", function() {
                    expect(profile.provider).to.equal("facebook");
                })
            })
        });
    });
});