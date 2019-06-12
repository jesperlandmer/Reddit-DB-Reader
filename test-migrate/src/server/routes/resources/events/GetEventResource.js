(function() {

    "use strict";

    let usersDB = require("../../../Model/Users");

    /**
     * Module to get activity data. The resource also provides the activity host-data
     * @param activity - activity data object
     */

    module.exports = function(activity) {

        return new Promise((resolve, reject) => {

            let count; // total participants
            let participantsArray = [];

            usersDB.findOne({id: activity.host_id}, function(err, result) { // find host user data
                if (err) {
                    reject(err);
                }

                if (activity.participants_id) { // Check if activity participants_id is default(null) or array
                    participantsArray = JSON.parse(activity.participants_id);
                    count = participantsArray.length; // get participants_id-array length
                }

                let activityData = {
                    id: activity.id, // activity id
                    host: result[0].name, // activity host name
                    host_id: activity.host_id, // activity host id
                    user: result[0].id, // active user id
                    picture: result[0].picture, // host picture
                    title: activity.event_name, // activity name
                    description: activity.description, // activity description
                    date: activity.date, // activity date
                    time: activity.time, // activity time
                    address: activity.location, // activity address string
                    needed: activity.needed, // needed participants
                    tags: activity.tags, // activity tags
                    participants: count || 0, // activity participants integer
                    participants_id: participantsArray // activity participants array
                };

                try {
                    // try add parsed tags if tags exists and is JSON array
                    activityData.tags = JSON.parse(activity[0].tags);
                    resolve(activityData);
                } catch (e) {
                    resolve(activityData);
                }
            });
        })
    }

}());

