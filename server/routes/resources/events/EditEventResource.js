(function() {

    "use strict";

    let eventDB = require("../../../Model/Events");

    /**
     * Module to edit activity data
     * @param data - request from protocol
     * @param geocoder - result from GetCoordinatesResource geocoding service
     * @param id - activity request parameters
     */

    module.exports = function(data, geocoder, id) {

        return new Promise((resolve, reject) => {
            let geocodeResult = geocoder[1]; // handle results from GetCoordinatesResource
            data.body.id = id; // set activity id to the request parameter id

            if (geocodeResult.length > 0) {
                var latLng = { // set activity location coordinates
                    lat: geocodeResult[0].latitude,
                    lng: geocodeResult[0].longitude
                };
                data.body.latLng = JSON.stringify(latLng);
                eventDB.editOne(data.body, function(err, result) {

                    if (err) {
                        reject("Error editing activity resource: " + err);
                    } else {
                        resolve(result); // resolve updated activity data
                    }
                });
            } else {
                reject("Failed geocoding address");
            }
        });
    }

}());
