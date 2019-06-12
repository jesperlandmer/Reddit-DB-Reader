(function() {

    "use strict";

    /**
     * Module to delete data row from table
     * @param options - database connection
     * @param data - data to be removed
     * @param callback
     */
    module.exports = function(options, data, callback) {

        var sql;
        var key = Object.keys(data)[0];

        if (Object.keys(data)[0]) { // check if data has properties
            // general method to delete resource from db
            sql = "DELETE FROM " + options.table + " WHERE " + key + " = ?";
            options.connection.query(sql, [data[key]],
                (err, results) => {

                    if (err) {
                        callback(err);
                    }

                    callback(null, results);
                });
        } else if (Object.keys(data)[1] === "host_id") { // for testing purposes - to find activity without id
            sql = "DELETE FROM " + options.table + " WHERE host_id = ? and event_name = ?";
            options.connection.query(sql, [data.host_id, data.event_name],
                (err, results) => {
                    if (err) {
                        callback(err, results);
                    }
                    else {
                        callback(null, results);
                    }
                });
        }
    }
}());
