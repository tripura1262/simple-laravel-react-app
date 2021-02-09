import React, { Component } from "react";
import Weather from "./Weather";
import SideNavbar from './../Navigation/SideNavbar'

export default function DisplayWeather() {
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <SideNavbar />
                <div className="col-md-8 col-md-offset-0">
                    <Weather />
                </div>
            </div>
        </div>
    )
}