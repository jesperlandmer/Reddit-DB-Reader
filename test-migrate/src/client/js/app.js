// Config Settings
var settings = require("./tools/settings");
var activities = [];
var socket = io();

// Socket Display Activities
socket.on("activities", function(data) {

    var mapData = [];
    settings.activities = data;

    data.forEach(function(activity) {

        mapData.push({
            title: activity.event_name,
            position: JSON.parse(activity.latLng),
            id: activity.id
        })
    });

    settings.activitiesSimple = mapData;
    prepareDOM();
    require("./app/chatResource")();
    require("./app/searchResource")();
});

/**
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js").then(function(registration) {
        }, function(err) {
            console.error("ServiceWorker registration failed: ", err);
        });
    });
}
 */

function prepareDOM() {

    // Promisify to load modules sync - so that variable "google" is available from VueGoogleMap
    Promise.resolve(function() {
        // Load Components
        require("./components/VueGoogleMap");
        require("./components/DatePicker");
        require("./components/SearchGrid");
        require("./components/ActivityGrid");
        require("./components/TagInput");
        require("./components/Modal");
        require("./components/Chat");
    }()).then(function() {
        var options = { // geolocation options
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function error() { // if user declines sharing location data
            require("./app/modalResource")();
        }

        function success(position) { // if user accepts sharing location data
            settings.myPos = { lat: position.coords.latitude, lng: position.coords.longitude}; // My position coordinates
            settings.myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // My LatLng data
            settings.service = new google.maps.DistanceMatrixService(); // Google Maps Distance Matrix - More info: https://developers.google.com/maps/documentation/distance-matrix/
            settings.geocoder = new google.maps.Geocoder(); // Google Maps GeoCoder - More info: https://developers.google.com/maps/documentation/geocoding/intro

            // Modules who require location data
            require("./app/homeResource")();
            require("./app/createResource")();
            require("./app/sidebarResource")();
            require("./app/mapResource")();
        }

        // Get User Position
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}
