import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Data from './data.geojson';
import Data2 from './data2.geojson';
import './App.css';
import myImage from './192x192_versie_1.png';


// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

// "homepage": "https://alexpost95.github.io/C-CTest/",


var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHBvc3QiLCJhIjoiY2p2MmdmcHV2MHl0YTQ5cWN6bWR6Zm5jaiJ9.glKqi6Jo4dp4esW7k_CBFA';

export default class Mapbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 2.6,
            lat: 51.4985,
            zoom: 6,
            pointClicked: false,
            popupOpened: false
        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        var component = this;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', () => {

            map.loadImage(myImage, function(error, image) {
                if (error) throw error;
                map.addImage('pointer', image);
                map.addLayer({
                    id: 'beenThereLocations',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: Data,
                        cluster: true,
                        clusterMaxZoom: 20,
                        clusterRadius: 5
                    },
                    "layout": {
                        "icon-image": "pointer",
                        "icon-size": 0.3,
                        "icon-allow-overlap": true
                    }
                });
            });
        });

        map.on('click', () => {
            let popup = document.getElementById("popupDiv")
            popup.style.display = "none";
            component.setState({pointClicked: false});
            component.setState({popupOpened: false});
        });

        map.on('click', 'beenThereLocations', (e) => {
            console.log(e);
            component.setState({pointClicked: true});
            map.flyTo({center: e.features[0].geometry.coordinates});
            let popup = document.getElementById("popupDiv");

            let coordinates = e.features[0].geometry.coordinates.slice();
            let name = e.features[0].properties.name;
            let review = e.features[0].properties.review;
            let reviewerName = e.features[0].properties.reviewerName;
            let rating = e.features[0].properties.rating;

            if (name != undefined){
                component.setState({popupOpened: true});
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + reviewerName + " </h5>" + "<br />" + "Name: " + name + "<br />" + "Review: " + review + "<br />" + "Rating: " + rating + " stars" +
                    '<span class="' + "stars-container stars-" + rating * 20 + '">★★★★★</span> </div>';
            }
            if (e.features[0].properties.first != undefined && e.features[0].properties.second != undefined && e.features[0].properties.third == undefined){
                component.setState({popupOpened: true});
                let firstObject = JSON.parse(e.features[0].properties.first);
                let secondObject = JSON.parse(e.features[0].properties.second);
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + firstObject.reviewerName + " </h5>" + "<br />" + "Name: " + firstObject.name + "<br />" + "Review: " + firstObject.review + "<br />" + "Rating: " + '<span class="' + "stars-container stars-" + firstObject.rating * 20 + '">★★★★★</span> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + secondObject.reviewerName + " </h5>" + "<br />" + "Name: " + secondObject.name + "<br />" + "Review: " + secondObject.review + "<br />" + "Rating: " + '<span class="' + "stars-container stars-" + secondObject.rating * 20 + '">★★★★★</span> </div>';
            }
            if (e.features[0].properties.third != undefined){
                component.setState({popupOpened: true});
                let firstObject = JSON.parse(e.features[0].properties.first);
                let secondObject = JSON.parse(e.features[0].properties.second);
                let thirdObject = JSON.parse(e.features[0].properties.third);
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + firstObject.reviewerName + " </h5>" + "<br />" + "Name: " + firstObject.name + "<br />" + "Review: " + firstObject.review + "<br />" + "Rating: " + '<span class="' + "stars-container stars-" + firstObject.rating * 20 + '">★★★★★</span> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + secondObject.reviewerName + " </h5>" + "<br />" + "Name: " + secondObject.name + "<br />" + "Review: " + secondObject.review + "<br />" + "Rating: " + '<span class="' + "stars-container stars-" + secondObject.rating * 20 + '">★★★★★</span> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=\"Smiley face\"  align='left'> <div class='reviewtekst' align='left'><h5>Review by: " + thirdObject.reviewerName + " </h5>" + "<br />" + "Name: " + thirdObject.name + "<br />" + "Review: " + thirdObject.review + "<br />" + "Rating: " + '<span class="' + "stars-container stars-" + thirdObject.rating * 20 + '">★★★★★</span> </div>';
            }

            e.preventDefault();

            popup.style.display = "block";

            if (e.features[0].properties.name == undefined && e.features[0].properties.second == undefined && e.features[0].properties.third == undefined){
                popup.innerHTML = 'Cluster clicked';
            }
        });

        var popup = new mapboxgl.Popup({
            closeButton: false,
            // closeOnClick: false
        });


        map.on('click', function(e) {
            if (!component.state.pointClicked && !component.state.popupOpened){
                popup.setLngLat(e.lngLat)
                    .setHTML("<input type=\"text\" name=\"Name\" value=\"Name\"><br>\n" +
                        "<input type=\"text\" name=\"Review\" value=\"Review\"><br>" +
                        "<input type=\"number\" name=\"Rating\" value=\"Rating\"><br>\n" +
                        "<button id='saveButton' type='button'>Save</button>" + "<button id='closeButton' type='button'>Cancel</button>")
                    .addTo(map);
            }
            if (document.getElementById('closeButton') != null){
                document.getElementById('closeButton').onclick = function cancelClicked(){popup.remove()};
                document.getElementById('saveButton').onclick = function saveClicked(){popup.remove()};
            }


            // console.log(e);
            var newLocation = {};
            newLocation.type = "FeatureCollection";

            var features = []
            newLocation.features = features;
            var newFeature = {};
            features.push(newFeature);
            newFeature.type = "Feature";
            var properties = {};
            properties.name = "Testlocation";
            newFeature.properties = properties;

            var geometry = {};
            newFeature.geometry = geometry;
            geometry.type = "Point";
            var coordinates = [];
            coordinates.push(e.lngLat.lng);
            coordinates.push(e.lngLat.lat);
            // coordinates.push(-0.0638580322265625);
            // coordinates.push(51.50404120260676);
            geometry.coordinates = coordinates;
            var abc = JSON.stringify(newLocation);

        });

        // var nav = new mapboxgl.NavigationControl();
        // map.addControl(nav, 'top-left');

// Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

// Change it back to a pointer when it leaves.
        map.on('mouseleave', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = '';
        });

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: true,
            render: function(item) {
                var maki = item.properties.maki || 'marker';
                return "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" + maki + "-15.svg'><span class='geocoder-dropdown-text'>" + item.text + "</span></div>";
            },
            mapboxgl: mapboxgl,
            language: 'En-en'

        });

        map.addControl(geocoder, 'top-left');

        var geoControl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });


        map.addControl(geoControl, 'top-right');

        // https://github.com/mapbox/mapbox-gl-draw#usage-in-your-application
        // var Draw = new MapboxDraw();
        // map.addControl(Draw, 'top-right');
    }

    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <div>
                {/*<div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">*/}
                {/*    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>*/}
                {/*</div>*/}
                <div ref={el => this.mapContainer = el} className="mapdiv" />
            </div>
        );
    }
}