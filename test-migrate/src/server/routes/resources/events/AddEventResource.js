(function() {

    "use strict";

    let eventDB = require("../../../Model/Events");
    let AddHostedResource = require("../profile/AddHostedResource");

    /**
     * Module to add new activity data
     * @param data - request data from protocol
     * @param geocoder - result from GetCoordinatesResource geocoding service
     */

    module.exports = function(data, geocoder) {

        return new Promise((resolve, reject) => {
            let geocodeResult = geocoder[1]; // handle results from GetCoordinatesResource

            if ("user" in data) { // add host-id as active user id
                data.body.host_id = data.user.id;
            }

            if (geocodeResult.length > 0) {
                var latLng = { // set activity location coordinates
                    lat: geocodeResult[0].latitude,
                    lng: geocodeResult[0].longitude
                };
                data.body.latLng = JSON.stringify(latLng);
                eventDB.addOneUnique(data.body, function(err, result, id) {

                    if (err) {
                        reject("Error adding event resource: " + err);
                    } else if (data.testCondition) { // for testing purposes
                        resolve(result);
                    } else { // resolve new activity id
                        AddHostedResource(data.user);
                        resolve(id);
                    }
                });
            } else {
                reject("Failed geocoding address");
            }
        });
    }

}());
