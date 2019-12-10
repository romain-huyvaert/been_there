import React from 'react'
import mapboxgl from 'mapbox-gl'
// import Data from './data.geojson';
// import Data2 from './data2.geojson';
// import Data3 from './data3.geojson';
import './App.css';
import myImage from './192x192_versie_1.png';
import pinpointSelf from './pinpoint_self.png';
import axios from 'axios'

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
            addNewPinpoint: false,
            popupLocation: 0,
            userIdState: this.props.user,
            jsonData: {},
            clickedCoordinates: []
        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        let component = this;
        component.setState({userIdState: component.props.user});

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [lng, lat],
            zoom
        });

        if (document.getElementById('addPinpoint')){
            document.getElementById('addPinpoint').addEventListener("click", function (e) {
                component.setState({addNewPinpoint: !component.state.addNewPinpoint});
            });
        }

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
            map.loadImage(pinpointSelf, function(error, image){
                map.addImage('ownLocationPointer', image);
            });

            axios({
                method: 'post',
                url: '/api/reviews/friends/',
                data: {'userId': component.state.userIdState}
            }).then(function (response) {
                map.addSource('friends', {type: 'geojson', data: JSON.parse(response.data)});
                // console.log("Friends layer: " + response.data);
            })

            map.loadImage(myImage, function(error, image) {
                if (error) throw error;
                map.addImage('pointer', image);

                axios({
                    method: 'post',
                    url: '/api/reviews/friends/',
                    data: {'userId': component.state.userIdState}
                }).then(function(response) {
                    map.addLayer({
                        id: 'beenThereFriendsLocations',
                        type: 'symbol',
                        source: 'friends',
                        cluster: true,
                        clusterMaxZoom: 20,
                        clusterRadius: 5,
                        "layout": {
                            "icon-image": "pointer",
                            "icon-size": 0.3,
                            "icon-allow-overlap": true
                        }
                    });
                });
            });


            axios({
                method: 'post',
                url: '/api/reviews/user/',
                data: {'userId': component.state.userIdState}
            }).then(function (response) {
                map.addSource('ownLocations', {type: 'geojson', data: JSON.parse(response.data)});
                // console.log("ownLocations layer: " + response.data);
            })

            map.loadImage(myImage, function(error, image) {
                if (error) throw error;

                axios({
                    method: 'post',
                    url: '/api/reviews/user/',
                    data: {'userId': component.state.userIdState}
                }).then(function(response) {
                    map.addLayer({
                        id: 'beenThereOwnLocations',
                        type: 'symbol',
                        source: 'ownLocations',
                        cluster: true,
                        clusterMaxZoom: 20,
                        clusterRadius: 5,
                        "layout": {
                            "icon-image": "ownLocationPointer",
                            "icon-size": 0.05,
                            "icon-allow-overlap": true
                        }
                    });
                });
            });
        });

        // console.log("User props: " + component.props.user);
        // console.log("User state: " + component.state.userIdState);

        map.on('click', () => {
            let popup = document.getElementById("popupDiv")
            popup.style.display = "none";
            component.setState({pointClicked: false});
            component.setState({popupOpened: false});
        });

        map.on('click', 'beenThereFriendsLocations', (e) => {
            // console.log(e);
            component.setState({pointClicked: true});
            map.flyTo({center: e.features[0].geometry.coordinates});

            let popup = document.getElementById("popupDiv");
            let name = e.features[0].properties.name;
            let title = e.features[0].properties.title;
            let user = e.features[0].properties.user;
            let userName = e.features[0].properties.username;
            let text = e.features[0].properties.text;
            let review = e.features[0].properties.review;
            let reviewerName = e.features[0].properties.reviewerName;
            let rating = e.features[0].properties.rating;

            component.setState({popupOpened: true});

            if (title !== undefined){
                // console.log("clicked title: " + title);
                component.setState({popupOpened: true});
                // console.log("own point clicked");

                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + userName + "  align='left'> <div> <p class='reviewernaam'> " + userName + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + title + "</h2>" + text + "<br />" + '<span class="' + "stars-container stars-" + rating * 20 + '">★★★★★</span> ' +
                    '<button id="popupCloseButton" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';

                // popup.style.display = "block";

            }

            if (document.getElementById("popupCloseButton") !== null) {
                document.getElementById("popupCloseButton").addEventListener("click", function (e) {
                    popup.style.display = "none";
                });
            }

            e.preventDefault();

            popup.style.display = "block";

            if (e.features[0].properties.title === undefined){
                // popup.innerHTML = 'Cluster clicked';
                popup.style.display = "none";

                // console.log(e.lngLat);
                map.zoomIn(2);
                map.flyTo({center: e.lngLat, zoom: 10});
            }
        });

        var popup = new mapboxgl.Popup({
            closeButton: false,
            // closeOnClick: false
        });

        var editPopup = new mapboxgl.Popup({
            closeButton: false,
            // closeOnClick: false
        });

        map.on('click', 'beenThereOwnLocations', (e) => {
            // console.log(e);
            component.setState({pointClicked: true});
            map.flyTo({center: e.features[0].geometry.coordinates});

            let popup = document.getElementById("popupDiv");
            let title = e.features[0].properties.title;
            let user = e.features[0].properties.user;
            let text = e.features[0].properties.text;
            let rating = e.features[0].properties.rating;
            let rewiewId = e.features[0].properties.pk;
            component.setState({tempCoordinates: [e.lngLat.lng.toString(), e.lngLat.lat.toString()]});

            // console.log("reviewId: " + rewiewId);

            component.setState({popupOpened: true});

            if (title !== undefined){
                // console.log("clicked title: " + title);
                component.setState({popupOpened: true});
                popup.style.display = "block";

                popup.innerHTML = "<img src=\"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadmissions.colostate.edu%2Fmedia%2Fsites%2F19%2F2014%2F07%2Ficon_silhouette-01-1024x1024.png&f=1&nofb=1\" alt=" + user + "  align='left'> <div> <p class='reviewernaam'> " + "Own review" + user + " </p> </div>      <div class='reviewtekst' align='left'> <h2 class='bold'>" + title + "</h2>" + text + "<br />" + '<span class="' + "stars-container stars-" + rating * 20 + '">★★★★★</span>' + "<br /><button class='btn btn-primary' style='border-radius: 5px' id='removeButton' type='button'>Remove</button> <button class='btn btn-success' style='border-radius: 5px' id='editButton' type='button'>Edit</button>" +
                    '<button id="popupCloseButton" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';
            }

            if (document.getElementById('removeButton') != null) {
                document.getElementById('removeButton').onclick = function saveClicked(e) {
                    axios({
                        method: 'post',
                        url: '/api/reviews/delete/',
                        data: {'userId': component.state.userIdState, 'reviewId': rewiewId}
                    }).then(function (response) {
                        // map.getSource('ownLocations').setData(JSON.parse(response.data));
                        // console.log("Deleted review with id: " + rewiewId + ", " + response);
                        axios({
                            method: 'post',
                            url: '/api/reviews/user/',
                            data: {'userId': component.state.userIdState}
                        }).then(function (response) {
                            map.getSource('ownLocations').setData(JSON.parse(response.data));
                            popup.style.display = "none";

                            // console.log("updated own data: " + response.data);
                        });
                    });
                }
            }
            if (document.getElementById('editButton') != null) {
                document.getElementById('editButton').onclick = function editClicked(e) {

                    editPopup.setLngLat(component.state.tempCoordinates)
                        .setHTML(
                            "<div class='form-group'><h10>Edit review</h10> <hr/>" +
                            "<input type='text' id='Name' name='Name' value="+title+" placeholder=" + title + " class='form-control' required><br>\n" +
                            "<textarea id= 'Review' name='Review' name='textarea' rows='4' class='form-control' placeholder=" + text + " required>"+text+"</textarea><hr/>" +
                            "<label>Rating(0-5)</label>" +
                            "<select value=4 class='form-control' id='Rating'>" +
                            "<option>0</option>\n" +
                            "<option>1</option>\n" +
                            "<option>2</option>\n" +
                            "<option>3</option>\n" +
                            "<option>4</option>\n" +
                            "<option>5</option>" +
                            "</select><br />" +
                            // "<input type='datetime-local'>" +
                            "<button class='btn btn-primary' style='border-radius: 5px' id='saveButton' type='button'>Save</button>" + "  " + "<button class='btn btn-danger' style='border-radius: 5px' id='popupCloseButton' type='button'>Cancel</button>" +
                            "<input type='hidden' id= 'lng' name='lng' value=" + component.state.tempCoordinates[0] + "><br>" +
                            "<input type='hidden' id= 'lat' name='lat' value=" + component.state.tempCoordinates[0] + " class='btn'></div>"
                        )
                        .addTo(map);
                    document.getElementById('Rating').value = rating;

                    if (document.getElementById("popupCloseButton") !== null) {
                        document.getElementById('popupCloseButton').onclick = function cancelClicked(){editPopup.remove()};
                    }

                    if (document.getElementById('saveButton') != null) {
                        document.getElementById('saveButton').onclick = function saveClicked(e) {
                            var name, rating, review, lng, lat;

                            if (document.getElementById('Name')) {
                                name = document.getElementById('Name').value;
                            }
                            if (document.getElementById('Review')) {
                                review = document.getElementById('Review').value;
                            }
                            if (document.getElementById('Rating')) {
                                rating = document.getElementById('Rating').value;
                            }
                            if (document.getElementById('lng')) {
                                lng = document.getElementById('lng').value;
                            }
                            if (document.getElementById('lat')) {
                                lat = document.getElementById('lat').value;
                            }

                            var layerId = "newPoint" + component.state.index++;

                            if (name != "" && review != "" && rating != "") {

                                axios({
                                    method: 'post',
                                    url: '/api/reviews/update/',
                                    data: {
                                        reviewId: rewiewId,
                                        userId: component.state.userIdState,
                                        name: name,
                                        rating: rating,
                                        review: review,
                                        point: component.state.tempCoordinates,
                                    }
                                }).then(function (response) {
                                    axios({
                                        method: 'post',
                                        url: '/api/reviews/user/',
                                        data: {'userId': component.state.userIdState}
                                    }).then(function (response) {
                                        map.getSource('ownLocations').setData(JSON.parse(response.data));
                                        // popup.style.display = "none";

                                        // console.log("updated own data: " + response.data);
                                    });
                                }).then(function (response) {
                                    alert("Review updated");
                                    editPopup.remove();
                                    popup.style.display = "none";
                                });
                            } else{
                                alert("Not all fields have been filled in");
                            }
                        }
                    }
                }
            }


            e.preventDefault();

            popup.style.display = "block";

            if (e.features[0].properties.title === undefined){
                // popup.innerHTML = 'Cluster clicked';
                popup.style.display = "none";

                // console.log(e.lngLat);
                map.zoomIn(2);
                map.flyTo({center: e.lngLat, zoom: 10});
            }
        });

        map.on('click', function(e) {
            if (!component.state.pointClicked && !component.state.popupOpened && !component.state.newPointClicked){

                if (component.state.addNewPinpoint === true){
                    map.flyTo({center: e.lngLat});
                    var coordinates = [];
                    coordinates.push(e.lngLat.lng);
                    coordinates.push(e.lngLat.lat);

                    popup.setLngLat(e.lngLat)
                        .setHTML(
                            "<div class='form-group'><h10>Add a new review</h10> <hr/>" +
                            "<input type='text' id= 'Name' name='Name' placeholder='Title' class='form-control' required><br>\n" +
                            "<textarea id= 'Review' name='Review' name='textarea' rows='4' class='form-control' placeholder='Review' required></textarea><hr/>" +
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
            if (document.getElementById("Name")){
                document.getElementById("Name").addEventListener('click', function (e) {

                    e.preventDefault();
                })
            }

            if (document.getElementById('closeButton') != null){
                document.getElementById('closeButton').onclick = function cancelClicked(){popup.remove()};
            }
            if (document.getElementById('saveButton') != null) {
                document.getElementById('saveButton').onclick = function saveClicked(e) {
                    var name, rating, review, lng, lat;

                    if (document.getElementById('Name')) {
                        name = document.getElementById('Name').value;
                    }
                    if (document.getElementById('Review')) {
                        review = document.getElementById('Review').value;
                    }
                    if (document.getElementById('Rating')) {
                        rating = document.getElementById('Rating').value;
                    }
                    if (document.getElementById('lng')) {
                        lng = document.getElementById('lng').value;
                    }
                    if (document.getElementById('lat')) {
                        lat = document.getElementById('lat').value;
                    }
                    var coordinates = [];
                    coordinates.push(lng, lat);

                    if (name != "" && review != "" && rating != ""){
                        axios({
                            method: 'post',
                            url: '/api/reviews/add/',
                            data: {
                                name: name,
                                review: review,
                                rating: rating,
                                point: coordinates,
                                userId: component.state.userIdState
                            }
                        }).then(function (response) {
                            axios({
                                method: 'post',
                                url: '/api/reviews/user/',
                                data: {'userId': component.state.userIdState}
                            }).then(function (response) {
                                map.getSource('ownLocations').setData(JSON.parse(response.data));
                                // popup.style.display = "none";
                                popup.remove();

                                // console.log("updated own data: " + response.data);
                            });
                        });
                    }
                    else {
                        alert("Not all fields have been filled in");
                    }
                }
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

    }

    render() {
        // const { lng, lat, zoom } = this.state;

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