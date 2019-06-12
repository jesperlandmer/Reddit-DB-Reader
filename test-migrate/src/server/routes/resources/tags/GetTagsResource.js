(function() {

    "use strict";

    let tagsDB = require("../../../Model/Tags");

    /**
     * Module to get all tag data
     */

    module.exports = function() {

        return new Promise((resolve, reject) => {
            tagsDB.findAll({}, function(err, result) { // get all tags

                if (err) {
                    reject(err);
                }

                resolve(result)
            });
        });
    }

}());
