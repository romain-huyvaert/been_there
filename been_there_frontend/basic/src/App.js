import React from 'react'
import ReactDOM from 'react-dom'
import Mapbox from './Mapbox'
import Header from "./Header";


export default class Application extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <Mapbox />
                <div id="popupDiv">asdfasdf</div>
            </div>
        );
    }
}