(function() {

    "use strict";

    const Vue = require("vue");
    var config = require("./../tools/config");
    var settings = require("./../tools/settings");

    /**
     * Vue-Google-Map object among other functionality for handling activity-data
     * @type {Vue}
     */
    module.exports = function() {
        return new Vue({
            el: "#search-canvas",
            data: {
                searchQuery: "",
                searchGridColumns: ["title", "location", "tags"],
                gridData: []
            },
            /**
             * when created, style & add google maps info windows and activity list data
             */
            created: function() {
                var self = this;

                // Calculate distance to activities, present the activities in a list
                settings.activities.forEach(function(activity) {

                    var data = {
                        title: activity.event_name,
                        distance: activity.distance,
                        id: activity.id,
                        location: activity.location
                    };
                    try {
                        data.tags = JSON.parse(activity.tags);
                    } catch (e) {
                        data.tags = [activity.tags];
                    }

                    self.gridData.push(data);
                });

            },

            methods: {
                searchFilter: function(event) {
                    return event.title.indexOf(this.searchQuery) != -1
                        || event.distance.indexOf(this.searchQuery) != -1
                        ;
                }
            }
        })
    }
}());
