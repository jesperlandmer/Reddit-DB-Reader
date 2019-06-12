(function() {

    "use strict";

    let userDB = require("../../../Model/Users");

    /**
     * Module to add to user hosted count
     * @param user - req user session
     */

    module.exports = function(user) {

        if (!user) {
            throw Error("No user data")
        }

        return new Promise((resolve, reject) => {

            userDB.findOne({id: user.id}, function(err, response) {

                if (err) {
                    reject(err);
                }

                response[0].hosted++;

                userDB.editOne({id: user.id, hosted: response[0].hosted}, function(err, result) {

                    if (err) {
                        reject(err);
                    }

                    resolve(result)
                });
            });
        })
    }
}());
