
"use strict";

const Vue = require("vue");
const VueGoogleMap = require("vue-google-maps");

// Alter VueGoogleMap template to only generate input
VueGoogleMap.PlaceInput.template = "#place-input";
VueGoogleMap.Map.template = "#map-template";

// Vue-google-maps components - Read more here: https://github.com/GuillaumeLeclerc/vue-google-maps
VueGoogleMap.load({
    key: process.env.GOOGLE_API || "AIzaSyDC9xs_DNHv_Z7T7T43zc65zpOVPzgHlAs",
    v: "3.24",
    libraries: "places",
    language: "en"});
Vue.component("gmap-map", VueGoogleMap.Map);
Vue.component("place-input", VueGoogleMap.PlaceInput);
Vue.component("gmap-info-window", VueGoogleMap.InfoWindow);

module.exports = VueGoogleMap;
