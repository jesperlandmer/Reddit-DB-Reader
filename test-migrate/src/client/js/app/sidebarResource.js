(function() {

    "use strict";

    const Vue = require("vue");
    var settings = require("./../tools/settings");

    /**
     * Vue-Google-Map object among other functionality for handling activity-data
     * @type {Vue}
     */
    module.exports = function() {
        if (settings) {
            return new Vue({
                el: ".map-list-relation",
                data: {
                    searchQuery: "",
                    gridColumns: ["title", "distance"],
                    gridData: []
                },
                /**
                 * when created, add sidebar list of all activities
                 */
                created: function() {
                    var self = this;

                    // Calculate distance to activities, present the activities in a list
                    settings.activities.forEach(function(activity) {

                        // Get distance matrix
                        settings.service.getDistanceMatrix(
                            {
                                origins: [settings.myLatLng],
                                destinations: [activity.location],
                                travelMode: "WALKING"
                            }, function callback(response, status) {

                                if (response.rows[0].elements[0].status === "OK") {
                                    if (response.rows[0].elements[0].distance.value <= 10000) // check if nearby (withing 10 km)
                                    {
                                        activity.distance = response.rows[0].elements[0].distance.text;
                                        var data = {
                                            title: activity.event_name,
                                            distance: activity.distance,
                                            id: activity.id
                                        };
                                        self.gridData.push(data);
                                    }
                                }
                            });
                    });

                }
            })
        } else {
            throw Error("No parameter")
        }
    }
}());
