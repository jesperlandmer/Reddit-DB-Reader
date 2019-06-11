(function() {

    "use strict";

    let dbHelper = require("../../libs/dbHelper");

    /**
     * Module that configurates the different methods to use when communicating with the database
     * @param options - database connection figuration
     * @returns {{addOne: addOne, addOneUnique: addOneUnique, deleteOne: deleteOne, editOne: editOne, findOne: findOne, findAll: findAll}}
     */
    module.exports = function(options) {

        dbHelper.connection.query("USE " + options.database);

        return {
            addOne: function(data, callback) { // Adds a value blindly to db table
                dbHelper.table = options.table;
                require("./res/addOne")(dbHelper, data, function(err, result) {
                    if (err) {
                        callback(err)
                    }

                    callback(null, result);
                });
            },
            addOneUnique: function(data, callback) { // Checks if resource already exists, else adds the value
                var _self = this;
                dbHelper.table = options.table;

                _self.findOne(data, function(err, result) {

                    if (err) {
                        callback(err, null)
                    } else {
                        if (result.length <= 0) {
                            require("./res/addOne")(dbHelper, data, function(err, result, id) {
                                if (err) {
                                    callback(err);
                                }

                                callback(null, result, id);
                            });
                        } else {
                            // Compare objects
                            var dataRow = Object.assign({}, result[0]);
                            if (dataRow !== data) {
                                _self.editOne(data, function(err) {
                                    if (err) {
                                        callback(err);
                                    }

                                    callback(null, result);
                                });
                            }
                        }
                    }
                });
            },

            deleteOne: function(data, callback) { // Deletes resource from db table
                dbHelper.table = options.table;
                require("./res/deleteOne")(dbHelper, data, function(err, result) {
                    if (err) {
                        callback(err)
                    }

                    callback(null, result)
                });
            },

            editOne: function(data, callback) { // updates resource from db table
                dbHelper.table = options.table;
                require("./res/editOne")(dbHelper, data, function(err, result) {
                    if (err) {
                        callback(err)
                    }

                    callback(err, data, result);
                });
            },

            findOne: function(data, callback) { // finds resource from db table
                dbHelper.table = options.table;
                require("./res/findOne")(dbHelper, data, function(err, result) {
                    if (err) {
                        callback(err, null)
                    }

                    callback(null, result);
                });
            },

            findAll: function(data, callback) { // finds all resources from db table
                dbHelper.table = options.table;
                require("./res/findAll")(dbHelper, data, function(err, result) {
                    if (err) {
                        callback(err, null)
                    }

                    callback(null, result);
                });
            }
        }
    }
}());
