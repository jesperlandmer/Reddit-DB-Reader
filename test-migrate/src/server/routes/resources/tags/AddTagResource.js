(function() {

    "use strict";

    let tagDB = require("../../../Model/Tags");

    /**
     * Module to add new tag data
     * @param data - request from protocol
     */

    module.exports = function(data) {

        return new Promise((resolve, reject) => {
            try {
                if ("tags" in data.body) {
                    if (data.body.tags.length > 0) { // check if post has tags
                        JSON.parse(data.body.tags).forEach(function(tag) {
                            tagDB.addOneUnique({description: tag}, function(err) { // add each tag

                                if (err) {
                                    reject(err);
                                }
                            });
                        });
                    }

                    resolve(data.body.tags)
                } else {
                    reject("No tags key provided")
                }
            } catch (e) {
                reject(e);
            }
        });
    }

}());