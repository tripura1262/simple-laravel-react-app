import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import SideNavbar from "./../Navigation/SideNavbar";

export default function Home() {
    const [navigate, setNavigate] = useState(false)
    const user = JSON.parse(localStorage.getItem("userData"));
    const login = localStorage.getItem("isLoggedIn");
    if (!login) {
        return <Redirect to="/sign-in" />;
    }   
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <SideNavbar />
                <div className="col-md-8 col-md-offset-0">
                    <h5 className="content">
                        Welcome, {user.data.first_name} {user.data.last_name}
                    </h5>
                </div>
            </div>
        </div>
    )
}