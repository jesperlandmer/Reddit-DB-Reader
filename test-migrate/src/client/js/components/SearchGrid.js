
"use strict";

const Vue = require("vue");

// Activity grid component
Vue.component("search-grid", {
    template: "#search-template",
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function() {
        var sortOrders = {};
        this.columns.forEach(function(key) {
            sortOrders[key] = 1
        });

        return {
            sortKey: "",
            sortOrders: sortOrders
        }
    },

    methods: {
        sortBy: function(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        href: function(event) {
            window.document.location.pathname = "mendr/api/activity/" + event.target.id;
        }
    }
});
