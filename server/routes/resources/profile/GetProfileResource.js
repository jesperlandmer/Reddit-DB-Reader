(function() {

    "use strict";

    let userDB = require("../../../Model/Users");
    let xssFilters = require("xss-filters");

    /**
     * Module to add new user data or check if user exists
     * @param id
     * @param callback
     */

    module.exports = function(id) {

        return new Promise((resolve, reject) => {

            userDB.findOne({id: id}, function(err, result) {

                if (err) {
                    throw err;
                }

                resolve(result);
            });
        })
    }
}());
