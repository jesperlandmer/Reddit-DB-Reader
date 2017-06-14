(function() {

    "use strict";

    let chatDB = require("../../../Model/Chat");

    /**
     * Module to edit chat data participants
     * @param data - activity data
     */

    module.exports = function(data) {

        return new Promise((resolve, reject) => {

            // add host id to chat participants
            let participants = JSON.parse(data.participants_id);
            participants.push(data.host_id);
            participants = JSON.stringify(participants);

            // updated chat object
            let updatedChat = {
                activity_id: data.id,
                participants_id: participants
            };

            chatDB.editOne(updatedChat, function(err, result) { // update chat table row

                if (err) {
                    reject("Error updating chat resource: " + err);
                }

                resolve(result);
            });
        });
    }
}());
