(function() {

    "use strict";

    /**
     * Module to find all data rows from table
     * @param options - database connection
     * @param data
     * @param callback
     */
    module.exports = function(options, data, callback) {

        var sql = "SELECT * FROM " +  options.table + ";";

        options.connection.query(sql,
            (err, results) => {
                if (err) {
                    throw err;
                }
                else {
                    callback(null, results);
                }
            });
    }
}());
