
"use strict";

const Vue = require("vue");

// Modal component
Vue.component("modal", {
    template: "#modal-template",
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    }
})
