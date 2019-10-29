import React, { Component } from 'react';
import './App.css';
import PopupDiv from './Popup';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer, ZoomControl, Popup, Image } from 'react-mapbox-gl';
import GeoJSON from './data.geojson';


//https://github.com/alex3165/react-mapbox-gl
//--save-dev
const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYWxleHBvc3QiLCJhIjoiY2p2MmdmcHV2MHl0YTQ5cWN6bWR6Zm5jaiJ9.glKqi6Jo4dp4esW7k_CBFA'
});

export default class Mapbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            geoJsonData: JSON.parse(JSON.stringify(GeoJSON)),
            test: 'abcd'
        }
    }

    componentDidMount() {
        // this.setState(this.state.geoJsonData = GeoJSON);
    }

    render() {
        const component = this;

        return (

            <div>
                <Map
                    style="mapbox://styles/mapbox/streets-v8"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                >
                    {/*<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }} paint={{ 'color': 'red' }}>*/}
                    {/*<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>*/}
                    {/*<Layer type="circle" id="marker" paint={{ 'circle-radius': 4, 'circle-color': '#6b44cc', 'circle-stroke-color': '#ffcf4b',*/}
                    {/*    'circle-stroke-width': 2, 'circle-opacity': 1  }}>*/}
                    {/*    <Feature coordinates={[-0.1589423418045044, 51.497202145853784]}/>*/}
                    {/*    <Feature coordinates={[-0.15822887420654297, 51.49493113833391]}/>*/}
                    {/*    <Feature coordinates={[-0.1631641387939453, 51.49570596538067]}/>*/}


                    {/*<Layer type="circle" id="marker" paint={{ 'circle-radius': 4, 'circle-color': '#6b44cc', 'circle-stroke-color': '#ffcf4b',*/}
                    {/*    'circle-stroke-width': 2, 'circle-opacity': 1  }}>*/}

                    {/*        <Feature coordinates={[-0.1631641387939453, 51.49570596538067]} onClick={function () {*/}
                    {/*            alert("marker clicked");*/}
                    {/*        }}/>*/}
                    {/*</Layer>*/}
                    {/*<Image id={'image-uid'} url={'data:image/png;base64,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'} />*/}

                    <GeoJSONLayer
                        id="marker"
                        data={GeoJSON}

                        symbolLayout={{ 'icon-image': 'marker-15' }}
                        // circlePaint={{ 'circle-radius': 4.3, 'circle-color': 'red', 'circle-stroke-color': 'white', 'circle-stroke-width': 2, 'circle-opacity': 1  }}
                        symbolOnClick={function (e) {
                            // alert(JSON.parse(GeoJSON).toString())

                            var element = document.getElementById('popupDiv');
                            console.log(e)

                            var x = document.getElementById("popupDiv");
                            if (x.style.display === "none") {
                                x.style.display = "block";
                                x.textContent = 'Lat: ' + e.lngLat.lat + 'long: ' + e.lngLat.lng;
                            } else {
                                x.style.display = "none";
                            }

                        }}
                        // circleOnClick={function () {
                        //     alert(GeoJSON.toString())
                        // }}

                    />

                    {/*<Popup*/}
                    {/*    coordinates={[-0.13235092163085938,51.518250335096376]}*/}
                    {/*    offset={{*/}
                    {/*        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]*/}
                    {/*    }}>*/}
                    {/*    <h1>Popup</h1>*/}
                    {/*</Popup>*/}

                    <ZoomControl />


                    {/*<Popup*/}
                    {/*    coordinates={[-0.13235092163085938,51.518250335096376]}*/}
                    {/*    offset={{*/}
                    {/*        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]*/}
                    {/*    }}>*/}
                    {/*    <h1>Popup</h1>*/}
                    {/*</Popup>*/}
                </Map>

                <div id="popupDiv">
                    <h2>tes test</h2>
                </div>
            </div>
        )
    }
}