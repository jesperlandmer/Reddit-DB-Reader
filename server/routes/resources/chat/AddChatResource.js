(function() {

    "use strict";

    let chatDB = require("../../../Model/Chat");

    /**
     * Module to add new chat data
     * @param activityId - activity id that will be referenced by chat
     * @param data - request from protocol
     */

    module.exports = function(activityId, data) {

        let participants; // chat participants

        return new Promise((resolve, reject) => {

            participants = JSON.stringify([data.body.host_id]); // Add host to participants

            let newChat = {
                name: data.body.event_name, // Activity Name
                activity_id: activityId[0][Object.keys(activityId[0])[0]], // Activity ID
                participants_id: participants // Activity Participants & Host
            };

            chatDB.addOne(newChat, function(err, result) {

                if (err) {
                    reject("Error adding chat resource: " + err);
                }

                resolve({result: result, id: activityId, activityData: data}); // resolve for testing purposes
            });
        });
    }
}());
