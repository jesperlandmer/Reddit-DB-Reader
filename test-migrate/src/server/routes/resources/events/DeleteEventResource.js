(function() {

    "use strict";

    let eventDB = require("../../../Model/Events");

    /**
     * Module to remove activity data
     * @param id - activity id
     */

    module.exports = function(id) {

        return new Promise((resolve, reject) => {
            eventDB.deleteOne({id: id}, function(err, result) { // delete event by id

                if (err || result.affectedRows <= 0) { // check if affected db-rows
                    reject(err);
                }
                resolve(result);
            });
        })
    }

}());
