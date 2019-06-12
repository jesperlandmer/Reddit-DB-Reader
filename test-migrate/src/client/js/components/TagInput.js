
"use strict";

const Vue = require("vue");
var tags = [];

// Tag Input Element Component
module.exports = Vue.component("tag-editor-input", {
    replace: true,
    template: "#tag-input",
    props: {
        data: Array
    },
    computed: {
    },
    methods: {
        clickEvent: function(evt) {

            if (evt) {
                if (evt.target.matches(".js-tag-close") || evt.target.matches(".js-tag")) {
                    tags = tags.filter(function(tag, i) {
                        return i != evt.target.getAttribute("data-index");
                    });

                    this.render(tags, this.$el);
                }
            }
        },

        keyCheck: function(evt) {
            if (!evt.target.matches(".js-tag-input")) {
                return;
            }

            if (evt.keyCode === 13) {
                if (String(evt.target.value).length) {
                    var value = String(evt.target.value);
                    if (!value.length || value.length > 20 || tags.length === 3) {
                        return;
                    }
                }

                tags.push(evt.target.value);
                this.render(tags, this.$el);
                return;
            }

            if (evt.keyCode === 8) {
                if (String(evt.target.value).length) {
                    return;
                }

                tags = tags.slice(0, tags.length - 1);
                this.render(tags, this.$el);
            }
        },

        render: function(tags, el) {
            el.innerHTML = tags.map(function(tag, i) {
                    return (
                        "<div class=\"tag js-tag\" data-index=\"" + i + "\">" +
                        tag +
                        "<span class=\"tag-close js-tag-close\" data-index=\"" + i + "\">×</span>" +
                        "</div>"
                    );
                }).join("") + (tags.length === 3 ? "" : "<input list=\"datalist-tags\" type=\"text\" placeholder=\"Enter new tag...\" class=\"js-tag-input\">");

            document.querySelector("#hiddenInput").value = JSON.stringify(tags);
        }
    }
});
