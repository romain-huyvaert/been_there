import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Data from './data.geojson';
import './App.css';



var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');


mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHBvc3QiLCJhIjoiY2p2MmdmcHV2MHl0YTQ5cWN6bWR6Zm5jaiJ9.glKqi6Jo4dp4esW7k_CBFA';

export default class Mapbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: -0.1541,
            lat: 51.4985,
            zoom: 13
        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
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

            map.loadImage("https://img.pngio.com/pin-point-map-yapisstickenco-google-map-pinpoint-png-225_340.png", function(error, image) {
                if (error) throw error;
                map.addImage('pointer', image);
                map.addLayer({
                    id: 'beenThereLocations',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: Data,
                        cluster: true,
                        clusterRadius: 10
                    },
                    // paint: {
                    //     'circle-color': '#6b44cc',
                    //     'circle-radius': 10,
                    //     'circle-stroke-width': 1,
                    //     'circle-stroke-color': '#ffcf4b'
                    // },
                    "layout": {
                        "icon-image": "pointer",
                        "icon-size": 0.09
                    }


                });
            });

        });

        map.on('click', () => {
            let popup = document.getElementById("popupDiv")
            popup.style.display = "none";
        });

        map.on('click', 'beenThereLocations', function (e) {
            map.flyTo({center: e.features[0].geometry.coordinates});

        });

        map.on('click', 'beenThereLocations', (e) => {

            let coordinates = e.features[0].geometry.coordinates.slice();
            let name = e.features[0].properties.name;
            let review = e.features[0].properties.review;
            let name2 = e.features[0].properties.name2;
            let review2 = e.features[0].properties.review2;

            let popup = document.getElementById("popupDiv")
            console.log(e.features[0].geometry.coordinates)
            // new mapboxgl.Popup().setLngLat(coordinates).setHTML(name + "<hr />" + review).addTo(map);

            // if(map.getLayer('clickedLocation')){
            //     map.removeLayer('clickedLocation');
            // }
            //
            // else{
            //     alert(e.features[0].geometry.coordinates);
            //     map.addLayer({
            //         id: 'clickedLocation',
            //         type: 'circle',
            //         source: {
            //             type: 'point',
            //             data: e.features[0].geometry.coordinates,
            //         },
            //         paint: {
            //             'circle-color': '#cc000b',
            //             'circle-radius': 19,
            //             'circle-stroke-width': 1,
            //             'circle-stroke-color': '#ffcf4b'
            //         },
            //     });
            // }

            popup.style.display = "block";

            if (name2 != undefined && review2 != undefined) {
                popup.innerHTML = "Name: " + name + "<br />" + "Review: " + review + "<br /><hr />" + "Name: " + name2 + "<br />" + "Review: " + review2;
            }
            else{
                popup.innerHTML = "Name: " + name + "<br />" + "Review: " + review + "<br />";
            }

        });

// Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

// Change it back to a pointer when it leaves.
        map.on('mouseleave', 'beenThereLocations', () => {
            map.getCanvas().style.cursor = '';
        });
        var a = new mapboxgl.Marker();

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: true,
            types: 'poi',
            render: function(item) {
                var maki = item.properties.maki || 'marker';
                return "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" + maki + "-15.svg'><span class='geocoder-dropdown-text'>" + item.text + "</span></div>";
            },
            mapboxgl: mapboxgl

        });

        map.addControl(geocoder, 'top-left');
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

// ReactDOM.render(<Application />, document.getElementById('app'));