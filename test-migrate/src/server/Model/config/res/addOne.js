(function() {

    "use strict";

    /**
     * Module to add data row to table
     * @param options - database connection
     * @param data - data to be added
     * @param callback
     */
    module.exports = function(options, data, callback) {

            var sql = "INSERT INTO " + options.table + " SET ?";

            options.connection.query(sql, data, (err, results, fields) => {
                if (err) {
                    callback(err);
                }

                options.connection.query("SELECT LAST_INSERT_ID();", (err, id) => {
                    callback(null, results, id);
                });
            })
        }
}());