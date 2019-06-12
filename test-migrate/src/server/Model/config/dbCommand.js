(function() {

    "use strict";

    let dbConfig = require("./dbConfig");

    /**
     * Module that returns the complete functions to communicate with Database
     * @param database
     * @param table
     * @returns {{addOne: addOne, addOneUnique: addOneUnique, deleteOne: deleteOne, editOne: editOne, findOne: findOne, findAll: findAll}}
     */
    module.exports = function(database, table) {

        let dbOptions = dbConfig({database: database, table: table});

        return {
            addOne: function(data, callback) {
                dbOptions.addOne(data, function(err, result) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, result);
                })
            },
            addOneUnique: function(data, callback) {
                dbOptions.addOneUnique(data, function(err, result, id) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, result, id);
                })
            },

            deleteOne: function(data, callback) {
                dbOptions.deleteOne(data, function(err, result) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, result);
                })
            },

            editOne: function(data, callback) {
                dbOptions.editOne(data, function(err, data, result) {
                    if (err) {
                        callback(err);
                    }

                    callback(err, data, result);
                })},

            findOne: function(data, callback) {dbOptions.findOne(data, function(err, result) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, result);
                })},

            findAll: function(data, callback) {dbOptions.findAll(data, function(err, result) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, result);
                })}
        }
    }
}());
