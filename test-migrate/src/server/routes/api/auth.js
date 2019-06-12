(function() {
    "use strict";

    var express = require("express");
    var router = express.Router();
    var oAuth = require("../resources/authorization/oAuth")();
    var AddProfileResource = require("../resources/profile/AddProfileResource");

    /**
     * Get Facebook Authorization process
     */

    router.get("/facebook", oAuth);

    /**
     * Handle Facebook User Data
     */

    router.get("/facebook/callback", oAuth, function(req, res) {

            AddProfileResource(req.user)
                .then(() => {res.redirect("/mendr/api/")})
                .catch(err => {throw err})
        });

    router.get("/logout", (req, res) => {

        req.session.destroy(function(err) {
            if (err) {
                next(err)
            }

            res.redirect("/");
            res.status(200);
        });
    });

    module.exports = router;
}());
