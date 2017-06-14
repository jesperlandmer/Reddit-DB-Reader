(function() {

    "use strict";

    const Vue = require("vue");
    var config = require("./../tools/config");
    var settings = require("./../tools/settings");
    var tags = [];
    var timer;

    /**
     * Vue-Google-Map object among other functionality for handling activity-data
     * @type {Vue}
     */
    module.exports = function() {
        if (settings) {
            return new Vue({
                el: "#map-canvas",
                data: {
                    center: {},
                    zoom: 12,
                    options: config.mapOptions,
                    events: settings.activitiesSimple,
                    tags: tags
                },
                /**
                 * when in ready process, set variables & insert place input
                 */
                ready: function() {
                    var self = this;

                    if ("children" in this.$el && "gmap-map") {
                        if ("gmap-map" in this.$el.children) {
                            this.$el.children["gmap-map"].children["0"].children["0"].addEventListener("click", function() {
                                self.centerMyPos();
                            });
                        }
                    }
                },
                /**
                 * when created, style & add google maps info windows and activity list data
                 */
                created: function() {
                    var self = this;

                    // Set interval/timeout until google map fully loads
                    timer = setInterval(self.infoWindowStylize, 100);
                    this.center = settings.myPos;
                },

                methods: {

                    infoWindowStylize: function(status) {
                        var background = document.querySelectorAll(".gm-style-iw");
                        if (!status && background.length > 0) {
                            background.forEach(function(win) {
                                win.previousElementSibling.style.display = "none";
                            });

                            clearInterval(timer)
                        } else if (status === "TEST") {
                            return background;
                        }
                    },

                    centerMyPos: function() {
                        this.center = settings.myPos;
                    },
                }
            })
        } else {
            throw Error("No parameter")
        }
    }
}());
