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
            map.addLayer({
                id: 'sharedRooms',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: Data
                },
                paint: {
                    'circle-color': '#446ccf'
                },

            });
        });

        map.on('click', 'sharedRooms', (e) => {
            let coordinates = e.features[0].geometry.coordinates.slice();
            let name = e.features[0].properties.name;
            let review = e.features[0].properties.review;

            let popup = document.getElementById("popupDiv")

            new mapboxgl.Popup().setLngLat(coordinates).setHTML(name + "<hr />" + review).addTo(map);
            popup.style.display = "block";
            popup.innerHTML = "Name: " + name + "<br />" + "Review: " + review;

        });

// Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'sharedRooms', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

// Change it back to a pointer when it leaves.
        map.on('mouseleave', 'sharedRooms', () => {
            map.getCanvas().style.cursor = '';
        });

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
        });



        // map.addControl(geocoder);
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
