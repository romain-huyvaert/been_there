import React from 'react'
import Mapbox from './Mapbox'
import Header from "./Header";


export default class Application extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <Mapbox />
                <div id="popupDiv"></div>
            </div>
        );
    }
}