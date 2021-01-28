import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
// import SubNav from "../Navigation/SubNav";
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
        const aStyle = {
            cursor: "pointer",
        };

        let navLink = (
            <div className="Tab">
                <NavLink
                    to="/sign-in"
                    activeClassName="activeLink"
                    className="signIn"
                >
                    Sign In
                </NavLink>
                <NavLink
                    exact
                    to="/"
                    activeClassName="activeLink"
                    className="signUp"
                >
                    Sign Up
                </NavLink>
            </div>
        );

        return <div>{navLink}</div>;
    }
}
export default withRouter(Header);
