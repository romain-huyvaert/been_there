import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Data from './data.geojson';
import './App.css';
import myImage from './192x192_versie_1.png';

// "homepage": "https://alexpost95.github.io/C-CTest/",

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHBvc3QiLCJhIjoiY2p2MmdmcHV2MHl0YTQ5cWN6bWR6Zm5jaiJ9.glKqi6Jo4dp4esW7k_CBFA';

export default class Mapbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 5.791168212890625,
            lat: 52.36302183361385,
            zoom: 7,
            pointClicked: false,
            popupOpened: false,
            newPointClicked: false,
            index: 0,
            addNewPinpoint: false
        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        var component = this;
        var testIds = [];

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [lng, lat],
            zoom
        });

        document.getElementById('addPinpoint').addEventListener("click", function (e) {
            component.setState({addNewPinpoint: !component.state.addNewPinpoint});
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
            map.loadImage('https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', function(error, image){
                map.addImage('newLocationPointer', image);
            });

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
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + name + "</h2>" + review + "<br />" + '<span class="' + "stars-container stars-" + rating * 20 + '">★★★★★</span> ' +
                    '<button id="popupCloseButton" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';
            }
            if (e.features[0].properties.first != undefined && e.features[0].properties.second != undefined && e.features[0].properties.third == undefined){
                component.setState({popupOpened: true});
                let firstObject = JSON.parse(e.features[0].properties.first);
                let secondObject = JSON.parse(e.features[0].properties.second);
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + firstObject.reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + firstObject.reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + firstObject.name + "</h2>" + firstObject.review + "<br />" + '<span class="' + "stars-container stars-" + firstObject.rating * 20 + '">★★★★★</span> </div>' +
                    '<button id="popupCloseButton" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + secondObject.reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + secondObject.reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + secondObject.name + "</h2>" + secondObject.review + "<br />" + '<span class="' + "stars-container stars-" + secondObject.rating * 20 + '">★★★★★</span> </div>'
            }
            if (e.features[0].properties.third != undefined){
                component.setState({popupOpened: true});
                let firstObject = JSON.parse(e.features[0].properties.first);
                let secondObject = JSON.parse(e.features[0].properties.second);
                let thirdObject = JSON.parse(e.features[0].properties.third);
                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + firstObject.reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + firstObject.reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + firstObject.name + "</h2>" + firstObject.review + "<br />" + '<span class="' + "stars-container stars-" + firstObject.rating * 20 + '">★★★★★</span> </div>' +
                    '<button id="popupCloseButton" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + secondObject.reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + secondObject.reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + secondObject.name + "</h2>" + secondObject.review + "<br />" + '<span class="' + "stars-container stars-" + secondObject.rating * 20 + '">★★★★★</span> </div>' +
                    "<hr /><br />" +
                    "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + thirdObject.reviewerName + "  align='left'> <div> <p class='reviewernaam'> " + thirdObject.reviewerName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + thirdObject.name + "</h2>" + thirdObject.review + "<br />" + '<span class="' + "stars-container stars-" + thirdObject.rating * 20 + '">★★★★★</span> </div>'
            }

            document.getElementById("popupCloseButton").addEventListener("click", function (e) {
                popup.style.display = "none";
            });
            e.preventDefault();

            popup.style.display = "block";

            if (e.features[0].properties.name == undefined && e.features[0].properties.second == undefined && e.features[0].properties.third == undefined){
                // popup.innerHTML = 'Cluster clicked';
                popup.style.display = "none";

                console.log(e.lngLat);
                map.zoomIn(2);
                var zoom = map.getZoom();
                map.flyTo({center: e.lngLat, zoom: 10});
            }
        });

        var popup = new mapboxgl.Popup({
            closeButton: false,
            // closeOnClick: false
        });

        map.on('mouseenter', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', function(e) {
            if (!component.state.pointClicked && !component.state.popupOpened && !component.state.newPointClicked){

                if (component.state.addNewPinpoint == true){
                    var coordinates = [];
                    coordinates.push(e.lngLat.lng);
                    coordinates.push(e.lngLat.lat);

                    popup.setLngLat(e.lngLat)
                        .setHTML("<div class='form-group'><h10>Add a new review</h10> <hr/>" +
                            "<input type='text' id= 'Name' name='Name' placeholder='Title' class='form-control'><br>\n" +
                            "<textarea id= 'Review' name='Review' name='textarea' rows='4' class='form-control' placeholder='Review'></textarea><hr/>" +
                            "<label>Rating(0-5)</label>" +
                            "<select class='form-control' id='Rating'>" +
                            "<option>0</option>\n" +
                            "<option>1</option>\n" +
                            "<option>2</option>\n" +
                            "<option>3</option>\n" +
                            "<option>4</option>\n" +
                            "<option>5</option>" +
                            "</select><br />" +
                            "<button class='btn btn-primary' style='border-radius: 5px' id='saveButton' type='button'>Save</button>" + "  " + "<button class='btn btn-danger' style='border-radius: 5px' id='closeButton' type='button'>Cancel</button>" +
                            "<input type='hidden' id= 'lng' name='lng' value=" + e.lngLat.lng + "><br>" +
                            "<input type='hidden' id= 'lat' name='lat' value=" + e.lngLat.lat + " class='btn'></div>"
                        )
                        .addTo(map);
                }

            }

            if (document.getElementById('closeButton') != null){
                document.getElementById('closeButton').onclick = function cancelClicked(){popup.remove()};
            }if (document.getElementById('saveButton') != null){
                document.getElementById('saveButton').onclick = function saveClicked(e){
                    var name = document.getElementById('Name').value;
                    var review = document.getElementById('Review').value;
                    var rating = document.getElementById('Rating').value;
                    var lng = document.getElementById('lng').value;
                    var lat = document.getElementById('lat').value;
                    var coordinates = [];
                    coordinates.push(lng, lat);
                    var layerId = "newPoint"+component.state.index++;

                    map.addLayer({
                        "id": layerId,
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "properties": {
                                        "name": name,
                                        "rating": rating,
                                        "review": review,
                                        "reviewer": '123456',
                                        "reviewerName": 'random dude',
                                        "icon": "rocket"
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": coordinates
                                    }
                                }]
                            }
                        },
                        "layout": {
                            "icon-image": "newLocationPointer",
                            "icon-size": 0.08
                        }
                    });
                    map.on('click', layerId, function(e){
                        component.setState({newPointClicked: true});
                        let popup = document.getElementById("popupDiv");
                        popup.innerHTML = "Review for: " + e.features[0].properties.name + "<br />" + 'Review: ' + e.features[0].properties.review + "<br />" +
                            "Rating: " + e.features[0].properties.rating;
                        popup.style.display = "block";
                        console.log(map.getLayer(e));

                        component.setState({newPointClicked: false});
                    })

                    popup.remove()};

            }
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
                {/*<select id="newLocationToggle">*/}
                {/*    <option value="On">On</option>*/}
                {/*    <option value="Off">Off</option>*/}
                {/*</select>*/}

                <div ref={el => this.mapContainer = el} className="mapdiv" />
            </div>
        );
    }
}