(function() {

    "use strict";

    let dbCommand = require("./config/dbCommand");

    /**
     * Module for storing Tags Resource
     * @type {{addOne, addOneUnique, deleteOne, editOne, findOne, findAll}}
     */
    module.exports = dbCommand(process.env.USERS_DATABASE, process.env.TAG_TABLE);
}());
