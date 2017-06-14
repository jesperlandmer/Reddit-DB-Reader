(function() {

    "use strict";

    const Vue = require("vue");
    const config = require("./../tools/config");
    var settings = require("./../tools/settings");

    /**
     * #body object for front page
     */
    module.exports = function() {
        if (settings) {
            return new Vue({
                el: "#home",
                data: {
                    styleObject: config.styleObject,
                    currentIndex: 0,
                    activitiesData: 0,
                    testData: 0,
                    locationData: ""
                },
                created: function() {
                    var self = this;

                    // Prepare first background image
                    try {
                        document.querySelector("#overlay").style.display = "none";
                        this.styleObject.background = "url(" + config.Image_Array[0] + ") center center / cover no-repeat fixed";
                    } catch (e) {
                        console.error("Document element not defined: " + e);
                    }

                    function cycle() {
                        self.styleObject.background = "url(" + config.Image_Array[self.currentIndex++] + ") center center / cover no-repeat fixed";
                        self.styleObject.backgroundSize = "cover";
                        self.currentIndex %= config.Image_Array.length;
                        setTimeout(cycle, 10000);
                        return {
                            styleObject: self.styleObject,
                            image_array: config.Image_Array
                        }
                    }

                    // Cycle background images
                    setTimeout(cycle, 10000);

                    // Calculate walking distance between each activity
                    settings.activities.forEach(function(activity) {
                        settings.service.getDistanceMatrix(
                            {
                                origins: [settings.myLatLng],
                                destinations: [activity.location],
                                travelMode: "WALKING"
                            }, self.NearbyActivitiesCounter)
                    });

                    // Return nearest city name to front page
                    try {
                        settings.geocoder.geocode({latLng: settings.myLatLng}, function(results, status) {

                            self.locationData = results[0].address_components[3].long_name;

                        });
                    } catch (e) {
                        self.locationData = "Undefined";
                        console.error("Geocoder not defined");
                    }

                    // Export functions for testing
                    module.exports.cycle = cycle;
                    module.exports.callback = this.NearbyActivitiesCounter;
                },

                methods: {
                    NearbyActivitiesCounter: function callback(response, status) {
                        var distance;

                        if (response.rows[0].elements[0].status === "OK") {
                            distance = response.rows[0].elements[0].distance.value;
                        }

                        if (status === "TEST") {
                            distance = response;
                        }

                        // Display activities near if they're 10km near
                        if (distance < 10000) {
                            this.activitiesData += 1;
                        }

                        return this.activitiesData;
                    }
                }
            })
        } else {
            throw Error("No parameter")
        }
    }
}());
