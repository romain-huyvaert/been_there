// import 'bootstrap/dist/css/bootstrap.css';

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

    componentDidMount() {
        let component = this;

        // if(document.getElementById('userIdInput')){
        //     document.getElementById('userIdInput').addEventListener('change', function (e) {
        //         let user = document.getElementById('userIdInput').value;
        //         console.log("changed");
        //
        //         switch (user) {
        //             case 'User 1':
        //                 component.setState({userIdState: 1});
        //                 break;
        //             case 'User 2':
        //                 component.setState({userIdState: 2});
        //                 break;
        //             case 'User 3':
        //                 component.setState({userIdState: 3});
        //                 break;
        //             case 'User 4':
        //                 component.setState({userIdState: 4});
        //                 break;
        //             case 'User 5':
        //                 component.setState({userIdState: 5});
        //                 break;
        //         }
        //
        //         console.log('user: ' + user);
        //         console.log('userIdState: ' + component.state.userIdState);
        //
        //     });
        // }
        //
        //
        // document.getElementById('loginDiv').innerHTML = "<div class='form-group' style='padding: 5px 5px 15px 5px'><h1 style='color: white'>Choose user</h1> <br/>" +
        //     "<center><select class='form-control' id='userIdInput' style='border-radius: 5px; width: 60%'></center>" +
        //     "<option>User 1</option>\n" +
        //     "<option>User 2</option>\n" +
        //     "<option>User 3</option>\n" +
        //     "<option>User 4</option>\n" +
        //     "<option>User 5</option>\n" +
        //     "</select><br />" +
        //     "<button class='btn btn-primary' style='border-radius: 5px' id='continueButton' type='button'>Continue</button><br />"
        //
        // document.getElementById("continueButton").addEventListener('click', function (e) {
        //     component.setState({continue: true});
        // })
    }

    render() {
        let component = this;
        if (!component.state.continue){
            return (
                <div>

                    <div className="myImage"> </div>

                    <div className="col-sm-10 form-group-lg" id='loginDiv'>


                    <h1>Select user</h1><br />
                        <select id='userIdInput' className="form-control form-control-lg">
                            <option>User 1</option>
                            <option>User 2</option>
                            <option>User 3</option>
                            <option>User 4</option>
                            <option>User 5</option>
                        </select><br />
                        <button className="btn btn-default" id='userClick' type="button" onClick={function(){
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