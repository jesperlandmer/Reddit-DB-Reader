(function() {

    "use strict";

    /**
     * Module to edit data row from table
     * @param options - database connection
     * @param data - updated data
     * @param callback
     */
    module.exports = function(options, data, callback) {

        var sql;
        var key;

        if (data.id) {
            key = "id";
        } else {
            key = Object.keys(data)[0];
        }

        if (Object.keys(data)[0]) { // check if data has properties
            sql = "UPDATE " + options.table + " SET ? " +  "WHERE " + key + " = ?";
            options.connection.query(sql, [data, data[key]],
                (err, results) => {

                    if (err) {
                        callback(err);
                    }

                    callback(null, results);
                });
        } else {
            callback("Error updating the resource" + data, null);
        }
    }
}());
