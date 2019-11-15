import React from 'react'
import Mapbox from './Mapbox'
import Header from "./Header";


export default class Application extends React.Component {

    render() {

        return (
            <div>

                <Header />
                <button type="button" className="btn btn-danger" id="addPinpoint">Primary</button>


                <Mapbox />
                <div id="popupDiv"> </div>

            </div>
        );
    }
}