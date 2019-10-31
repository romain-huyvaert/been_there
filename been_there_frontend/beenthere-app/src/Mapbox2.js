import React, { Component } from 'react'

export class Mapbox2 extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        var style  = {
            position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%'
        };

        return <div style={style} ref={el => this.mapContainer = el} />;
    }
}

export default Mapbox2