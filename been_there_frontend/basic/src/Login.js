import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
import Mapbox from "./Mapbox";
import Header from "./Header";
import './App.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userIdState: '',
            continue: false
        };
    }

    render() {
        let component = this;
        if (!component.state.continue){
            return (
                <div>

                    <div className="myImage"> </div>

                    <div className="col-sm-10 form-group-lg" id='loginDiv'>


                    <div id='loginHeader'>Select user</div><br />
                        <select id='userIdInput' className="form-control form-control-lg">
                            <option>User 1</option>
                            <option>User 2</option>
                            <option>User 3</option>
                            <option>User 4</option>
                            <option>User 5</option>
                        </select><br />
                        <button className="btn btn-success btn-lg" id='userClick' type="button" onClick={function(){
                            component.setState({continue: true})
                            let user = document.getElementById('userIdInput').value;
                            component.setState({userIdState: user});
                            console.log('userIdState: ' + component.state.userIdState);
                        }}>Continue</button>
                </div>
                </div>
            );
        }
        else {
            return(
                <div>
                    <Header />

                    <button type="button" className="btn" id="addPinpoint" data-toggle="button"><i className="fa fa-map-marker fa-lg" aria-label='Find my location'></i></button>

                    <Mapbox user={component.state.userIdState}/>
                    <div id="popupDiv"> </div>

                </div>
            )
        }
    }
}