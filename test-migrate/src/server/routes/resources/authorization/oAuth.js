(function() {

    "use strict";

    // Read https://github.com/jaredhanson/passport-facebook about passport with facebook oAuth

    var passport = require("passport");
    var FacebookStrategy = require("passport-facebook").Strategy;

    /**
     * Module to fetch and return Facebook User Data with Passport
     * @param req
     * @param res
     * @param next
     */

    module.exports = function(req, res, next) {

        try {
            passport.use(new FacebookStrategy({
                    clientID: process.env.FACEBOOK_CLIENT_ID,
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    callbackURL: process.env.FACEBOOK_CLIENT_URL,
                    profileFields: ["id", "emails", "displayName", "name", "gender", "picture.type(large)"]
                },
                function(accessToken, refreshToken, profile, cb) {

                    profile.picture = "https://graph.facebook.com/" + profile.id + "/picture?width=320&height=320";
                    return cb(null, profile);
                }
            ));

            passport.serializeUser(function(user, cb) {
                cb(null, user.id);
            });

            passport.deserializeUser(function(obj, cb) {
                cb(null, obj);
            });

            return passport.authenticate("facebook", { scope: ["email"],
                failureRedirect: "/" });
        } catch (e) {

            throw e;
        }
    }

}());
