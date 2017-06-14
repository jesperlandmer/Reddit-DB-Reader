(function() {

    "use strict";

    module.exports = function(req, res, next) {

        if (req.user) {
            next(); // continue what we're doing
        } else {
            res.status(403); // send status prohibited area
            res.redirect("/");
        }
    }

}());
