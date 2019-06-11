(function() {

    "use strict";

    var express = require("express");
    var router = express.Router();
    var api = require("./api/api.js");

    router.get("/", (req, res) => {

        res.render("../views/home");
        res.status(200);
    });

    router.get("/about", (req, res) => {

        res.render("../views/home", {about: true});
        res.status(200);
    });

    router.use("/", api);

    module.exports = router;
}());
