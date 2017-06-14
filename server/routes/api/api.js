(function() {
    "use strict";

    var express = require("express");
    var router = express.Router();
    var CheckAuthResource = require("../resources/authorization/CheckAuthResource");

    /**
     * Router use APIs
     */

    router.use("/auth", require("./auth"));
    router.use("/mendr/api", CheckAuthResource, require("./mendr"));

    module.exports = router;
}());
