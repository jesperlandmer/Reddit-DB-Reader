(function() {

    /**
     * A module for connecting to the MySQL Database
     * v. 1.0.0
     * // Use specified Database
     CONNECTION.query("USE " + process.env.DATABASE);
     */

    "use strict";

    const mysql = require("mysql");

    module.exports = {

        connection: mysql.createConnection({
            host: "localhost",
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        })
    };
}());

