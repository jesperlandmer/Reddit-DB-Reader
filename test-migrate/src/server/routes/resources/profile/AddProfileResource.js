(function() {

    "use strict";

    let userDB = require("../../../Model/Users");
    let xssFilters = require("xss-filters");

    /**
     * Module to add new user data or check if user exists
     * @param user
     */

    module.exports = function(user) {

        if (!user) {
            throw Error("No user data")
        }

        user._json.picture = user.picture;
        let userData = {
            id: user._json.id,
            email: user._json.email,
            name: user._json.name,
            last_name: user._json.last_name,
            first_name: user._json.first_name,
            gender: user._json.gender,
            picture: user._json.picture
        };

        return new Promise((resolve, reject) => {

            // Filter for XSS
            for (let filter in userData) {
                if (userData.hasOwnProperty(filter)) {
                    userData[filter] = xssFilters.inHTMLData(userData[filter])
                }
            }

            userDB.addOneUnique(userData, function(err) {

                if (err) {
                    reject(err);
                }

                resolve(userData)
            });
        })
    }
}());
