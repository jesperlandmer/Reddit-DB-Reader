
"use strict";

const Vue = require("vue");

// Chat Element Component
Vue.component("chat-history", {
    template: "#chat-template",
    props: {
        data: Array
    },
    data: function() {
        var sortOrders = {};

        return {
            sortKey: "",
            sortOrders: sortOrders
        }
    },
    methods: {
        sortBy: function(key) {
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
});
