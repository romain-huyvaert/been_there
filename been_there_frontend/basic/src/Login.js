import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'

import axios from 'axios'
import Mapbox from "./Mapbox";
import Header from "./Header";
import './App.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userIdState: '',
            continue: false,
            users: []
        };
    }

    componentDidMount() {
        let component = this;

        /**
         * Make a request to get all the users from the database
         * Store the result of it in the users state
         */
        axios({
            method: 'get',
            url: '/api/users/',
            data: {}
        }).then(function (response) {
            component.setState({users: response.data});
        });
    }

    render() {
        let component = this;

        /**
         Create a dropdown list with all the users
         */
        const userList = this.state.users.map( (itm,idx) => {
            return <option>{itm.username}</option>
        });

        if (!component.state.continue){
            return (
                <div>
                    <div className="myImage"> </div>
                    <div id='loginDiv'>
                        <div id='loginHeader'>Select user</div><br />
                        <select id='userIdInput' className="form-control form-control-lg">
                            {userList}
                        </select>
                        <br />
                        <button className="btn btn-success btn-lg" id='userClick' type="button" onClick={function(){
                            component.setState({continue: true})

                            let user = document.getElementById('userIdInput').selectedIndex + 1;
                            component.setState({userIdState: user});
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