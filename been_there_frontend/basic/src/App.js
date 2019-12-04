import React from 'react'
import Mapbox from './Mapbox'
import Header from './Header';
import Login from './Login';


export default class Application extends React.Component {

    render() {

        return (
            <div id='App'>

               <Login style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
               }}/>

            </div>
        );
    }
}