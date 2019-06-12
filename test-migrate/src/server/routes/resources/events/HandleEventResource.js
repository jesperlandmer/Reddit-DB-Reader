(function() {

    "use strict";

    let eventDB = require("../../../Model/Events");
    let AddParticipatedResource = require("../profile/AddParticipatedResource");

    /**
     * Module to join or cancel participation in activity
     * @param req - contains post body(join or cancel)
     * @param activity - used to find and updated activity participants
     */

    module.exports = function(req, activity) {

        return new Promise((resolve, reject) => {

            let participants; // participants
            let data = { // data to update activity
                id: activity.id,
                host_id: activity.host_id
            };
            let user = req.user; // user data

            // Check if join or cancel
            if (req.body.join) {
                if (activity.participants_id) { // check if participants_id-array exists or null (null is default from db)
                    participants = JSON.parse(activity.participants_id);
                    participants.forEach((participant) => {
                        if (participant === user.id) { // Reject if already in participants array
                            throw new Error("Already a participant");
                        }
                    });

                    AddParticipatedResource(user);
                    participants.push(user.id);
                } else {
                    AddParticipatedResource(user);
                    participants = [user.id]; // if participants in activity is default(null), change to array
                }
            } else if (req.body.cancel) {
                participants = JSON.parse(activity.participants_id);
                participants.splice(participants.indexOf(user.id), 1); // remove user from participants array
            }

            data.participants_id = JSON.stringify(participants); // stringify participants array for db
            eventDB.editOne(data, function(err, result) {
                if (err || result.length <= 0) {
                    reject("Failed handle event resource: " + err);
                }

                resolve(result);
            });
        })
    }

}());
