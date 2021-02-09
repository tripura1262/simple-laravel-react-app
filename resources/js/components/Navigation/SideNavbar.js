import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faThList,
    faWind,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { NavItem } from "reactstrap";

export default function SideNavbar() {
    const [navigate, setNavigate] = useState(false)
    const history = useHistory();
    const onLogoutHandler = () => {
        localStorage.clear();
        setNavigate(true)
        if (navigate) {
            history.push("/sign-in");
        }
    };
    const login = localStorage.getItem("isLoggedIn");
    if (!login) {
        return <Redirect to="/sign-in" />;
    }   
    return (
        <div className="col-md-3 col-md-offset-0">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Sample Project</h3>
                </div>
                <Nav className="flex-column pt-2">
                    <NavItem>
                        <NavLink exact to="/home" activeClassName="active" className="nav-link" >
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Home
                    </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="/users" activeClassName="active" className="nav-link">
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        Users
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="/items" activeClassName="active" className="nav-link">
                            <FontAwesomeIcon icon={faThList} className="mr-2" />
                        Items
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="/weather" activeClassName="active" className="nav-link">
                            <FontAwesomeIcon icon={faWind} className="mr-2" />
                        Weather
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink exact to="#" activeClassName="" onClick={onLogoutHandler} className="nav-link">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}