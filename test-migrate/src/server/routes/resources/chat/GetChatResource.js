(function() {

    "use strict";

    let chatDB = require("../../../Model/Chat");

    /**
     * Module to add new chat data
     * @param id - chat id
     */

    module.exports = function(id) {

        return new Promise((resolve, reject) => {

            chatDB.findOne({id: id}, function(err, result) { // get chat resource

                if (err) {
                    reject("Error getting chat resource: " + err);
                }

                resolve(result);
            });
        })
    }
}());
