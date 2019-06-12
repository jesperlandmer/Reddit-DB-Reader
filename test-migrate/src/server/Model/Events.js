(function() {

    "use strict";

    let dbCommand = require("./config/dbCommand");

    /**
     * Module for storing Events Resource
     * @type {{addOne, addOneUnique, deleteOne, editOne, findOne, findAll}}
     */
    module.exports = dbCommand(process.env.USERS_DATABASE, process.env.EVENTS_TABLE);
}());
