
"use strict";

const Vue = require("vue");
var datePicker = require("vuejs-datepicker");

// Date Picker Element Component
var state = {
    disabled: {
        to: new Date() // Disable all dates up to specific date
    }
};

Vue.component("datepicker", datePicker);
