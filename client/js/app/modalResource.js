(function() {

    "use strict";

    const Vue = require("vue");

    /**
     * #body object for front page
     */
    module.exports = function() {
        return new Vue({
            el: "#home",
            data: {
                showModal: true
            }
        })
    }
}());
