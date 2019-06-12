(function() {

    "use strict";

    let dbCommand = require("./config/dbCommand");

    /**
     * Module for storing User Resource
     * @type {{addOne, addOneUnique, deleteOne, editOne, findOne, findAll}}
     */
    module.exports = dbCommand(process.env.USERS_DATABASE, process.env.USERS_TABLE);

}());
