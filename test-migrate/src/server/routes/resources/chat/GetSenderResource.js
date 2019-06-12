(function() {

    "use strict";

    let userDB = require("../../../Model/Users");

    /**
     * Module to fetch message sender data
     * @param message - message data
     */

    module.exports = function(message) {

        return new Promise((resolve, reject) => {

            // find user by message sender id
            userDB.findOne({id: message.message_sender_id}, function(err, userData) {

                if (err) {
                    reject(err);
                }

                resolve({message: message, user: userData[0]})
            });
        })
    }
}());
