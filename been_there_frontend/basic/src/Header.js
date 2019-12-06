import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div id="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="">Been there</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://alhooimeijer.wixsite.com/beenthere" target="_blank" rel="noopener noreferrer">About</a>
                        </li>
                        {/*<li className="nav-item active">*/}
                        {/*    <a className="nav-link" href="#">Account</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="#">Settings</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="#">Log out</a>*/}
                        {/*</li>*/}
                    </ul>
                    {/*<span className="navbar-text">*/}
                    {/*  Navbar text with an inline elements*/}
                    {/*</span>*/}
                </div>
            </nav>
            </div>
        )
    }
}

export default Header