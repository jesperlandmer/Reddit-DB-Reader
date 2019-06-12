(function() {

    "use strict";

    const Vue = require("vue");
    var config = require("./../tools/config");
    var settings = require("./../tools/settings");
    var tags = [];

    /**
     * Vue-Google-Map object among other functionality for handling activity-data
     * @type {Vue}
     */
    module.exports = function() {
        if (settings) {
            return new Vue({
                el: ".new-activity-resource",
                data: {
                    events: settings.activitiesSimple,
                    tags: tags
                },
                /**
                 * Function to set first & current form window
                 */
                ready: function() {
                    if (this.$el.children.msform) {
                        settings.msform = this.$el.children.msform.children;
                        settings.current_fs = settings.msform[1];
                    }
                },
                methods: {
                    /**
                     * Display next form input layout
                     * @param data
                     */
                    next: function(data) {
                        var locationInput = this.$el.querySelector("input[name='location']");
                        if (!locationInput.value && data) {
                            locationInput.value = data;
                        }
                        if (settings.current_fs === settings.msform[1]) {
                            settings.current_fs = settings.msform[2];
                            settings.msform.progressbar.children[1].classList.add("active");
                            settings.msform[1].style.display = "none";
                            settings.msform[2].style.display = "block";
                        } else {
                            settings.current_fs = settings.msform[3];
                            settings.msform.progressbar.children[2].classList.add("active");
                            settings.msform[2].style.display = "none";
                            settings.msform[3].style.display = "block";
                        }
                    },
                    /**
                     * Display previous form input layout
                     */
                    previous: function() {
                        if (settings.current_fs === settings.msform[2]) {
                            settings.current_fs = settings.msform[1];
                            settings.msform.progressbar.children[1].classList.remove("active");
                            settings.msform[1].style.display = "block";
                            settings.msform[2].style.display = "none";
                        } else {
                            settings.current_fs = settings.msform[2];
                            settings.msform.progressbar.children[2].classList.remove("active");
                            settings.msform[2].style.display = "block";
                            settings.msform[3].style.display = "none";
                        }
                    },

                    /**
                     * Function to prevent sending form when user presses "Enter"
                     * @param event
                     */
                    keyMonitor: function(event) {
                        if (event.key == "Enter") {
                            event.preventDefault();
                        }
                    }
                }
            })
        } else {
            throw Error("No parameter")
        }
    }
}());
