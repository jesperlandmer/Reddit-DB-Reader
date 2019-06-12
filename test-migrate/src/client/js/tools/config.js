

module.exports = {
    // Map Style Settings
    mapOptions: {
        styles: [{'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#a9ffe2'}]}, {
            'featureType': 'administrative.province', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]
        }, {
            'featureType': 'all', 'elementType': 'all', 'stylers': [{'hue': '#62e5be'}, {'saturation': -22}]
        }, {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [{'visibility': 'on'}, {'color': '#f7f7f7'}, {'saturation': 10}, {'lightness': 76}]
        }, {
            'featureType': 'landscape.natural',
            'elementType': 'all', 'stylers': [{'color': '#f7f7f7'}]
        }, {
            'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'color': '#62e5be'}]
        }, {
            'featureType': 'administrative.country', 'elementType': 'geometry.stroke', 'stylers': [{
                'visibility': 'simplified'
            }, {'color': '#3b5998'}]
        }, {
            'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'on'},
                {'color': '#8b9dc3'}]
        }, {
            'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}, {
                'color': '#c2f1e3'
            }]
        }, {
            'featureType': 'transit.line',
            'elementType': 'all',
            'stylers': [{'invert_lightness': !1}, {'color': '#ffffff'},
                {'weight': 0.43}]
        }, {'featureType': 'road.highway', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'road.local', 'elementType': 'geometry.fill', 'stylers': [{'color': '#8b9dc3'}]
        }, {
            'featureType': 'administrative',
            'elementType': 'labels.icon',
            'stylers': [{'visibility': 'on'}, {'color': '#3b5998'}]
        }],
        // Map control options setting
        mapTypeControlOptions: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        clickableIcons: false
    },
    // Styling object tool
    styleObject: {
        background: "",
        backgroundSize: "cover",
        height: "100%",
        transition: "all 3s ease-in-out"
    },
    // Background images
    Image_Array: ["https://i.imgur.com/mhRDlDq.jpg",
        "https://i.imgur.com/aa6vdJc.jpg", "https://i.imgur.com/saZZJEZ.jpg", "https://i.imgur.com/s99wby5.jpg"]
};