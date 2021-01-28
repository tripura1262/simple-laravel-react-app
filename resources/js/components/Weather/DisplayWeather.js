import React, { Component } from "react";
import Header from "../Header/Header";
import Weather from "./Weather";
import SideNavbar from './../Navigation/SideNavbar'
export default class DisplayWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
                <SideNavbar />
                <div className="content">
                <Weather />
                </div>
            </div>
        );
    }
}
