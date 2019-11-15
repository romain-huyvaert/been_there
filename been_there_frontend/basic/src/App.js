import React from 'react'
import Mapbox from './Mapbox'
import Header from "./Header";


export default class Application extends React.Component {

    render() {

        return (
            <div>

                <Header />
                <button type="button" className="btn" id="addPinpoint" data-toggle="button"><i className="fa fa-map-marker fa-lg" aria-label='Find my location'></i></button>
               <Mapbox />
                <div id="popupDiv"> </div>

            </div>
        );
    }
}