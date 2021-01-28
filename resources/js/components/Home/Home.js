import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import SideNavbar from "./../Navigation/SideNavbar";

export default class Home extends Component {
    state = {
        navigate: false,
    };

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };
    render() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/" push={true} />;
        }
        return (
            <div>
                <SideNavbar />
                <div className="content">
                    {/* <h3> HomePage</h3> */}
                    <div className="row">
                        <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
                            <h5> Welcome, {user.first_name} {user.last_name} </h5> 
                            {/* You have
                            Logged in successfully. */}
                        </div>
                        {/* <div className="col-xl-3 col-sm-12 col-md-3">
                            <Button
                                className="btn btn-primary text-right"
                                onClick={this.onLogoutHandler}
                            >
                                Logout
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
