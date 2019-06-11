(function() {

    "use strict";

    let xssFilters = require("xss-filters");
    let NodeGeocoder = require("node-geocoder");
    let AddTagResource = require("./../tags/AddTagResource");

    var options = { // geocoder options
        provider: "mapquest", // map provider - chose another map supplier to not interfere with google api
        httpAdapter: "https", // crypted transport protocol
        apiKey: process.env.MAPQUEST_API, // for Mapquest
        formatter: null
    };
    var geocoder = NodeGeocoder(options);

    /**
     * Module to add new tags and geocode coordinates from address
     * @param data
     */

    module.exports = function(data) {

        for (let filter in data.body) { // prevent cross-site-scripting and filter all posted data
            if (data.body.hasOwnProperty(filter) && xssFilters.inHTMLData(data.body[filter]).indexOf("&lt;") > 0) {
                throw Error("Cross-site scripting Attempt")
            }
        }

        return Promise.all([ // Add tags from post and geocode coordinates from address
            AddTagResource(data),
            geocoder.geocode(data.body.location)])
    }

}());
