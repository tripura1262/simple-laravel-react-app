import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem("isLoggedIn")
                ? localStorage.getItem("isLoggedIn")
                : false,
        };
    }
    // 1.3
    render() {
        let navLink = (
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-6">
                        <NavLink
                            to="/sign-in"
                            activeClassName="active"
                            // className="panel-tab"
                        >
                            Sign In
                        </NavLink>
                    </div>
                    <div className="col-xs-6">
                        <NavLink
                            exact
                            to="/"
                            activeClassName="active"
                            // className="panel-tab"
                        >
                            Sign Up
                </NavLink>
                    </div>
                </div>
                <hr />
            </div>
        );

        return <>{navLink}</>;
    }
}
export default withRouter(Header);
