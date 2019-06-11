(function() {

    "use strict";

    let eventDB = require("../../../Model/Events");

    /**
     * Module to find & get activity data
     * @param activityId - activity id
     */

    module.exports = function(activityId) {

        return new Promise((resolve, reject) => {

            eventDB.findOne({id: activityId}, function(err, result) {
                if (err || result.length <= 0) { // if err or none found
                    reject("None such event found: " + err);
                }

                try { // try parsing tag array
                    result[0].tags = JSON.parse(result[0].tags);
                } catch (e) {
                }

                resolve(result[0]);
            });
        })
    }

}());

