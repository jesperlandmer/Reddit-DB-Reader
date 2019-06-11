(function() {

    "use strict";

    let userDB = require("../../../Model/Users");

    /**
     * Module to add to user participated count
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

                response[0].participated++;

                userDB.editOne({id: user.id, participated: response[0].participated}, function(err, result) {

                    if (err) {
                        reject(err);
                    }

                    resolve(result)
                });
            });
        })
    }
}());
