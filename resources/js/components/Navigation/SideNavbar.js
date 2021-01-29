import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faThList,
    faWind,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Redirect, withRouter,useHistory } from "react-router-dom";

class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate : false
        }
    }

    onLogoutHandler = () => {
        // console.log('The link was clicked.');
        localStorage.clear();
        this.setState({
            navigate: true,
        });
        if (this.state.navigate) {
            window.location.href="#/sign-in"
        }
    };

    render() {
        // const { navigate } = this.state;
        // if (navigate) {
        //     return <Redirect to="/" push={true} />;
        // }
        return (
            <div
                className={classNames("sidebar", {
                    "is-open": this.props.isOpen,
                })}
            >
                <div className="sidebar-header">
                    <h3>Sample Project</h3>
                </div>

                <Nav className="flex-column pt-2">
                    <Nav.Item className="active">
                        <Nav.Link href="#/home">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Home
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/users">
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            Users
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/items">
                            <FontAwesomeIcon icon={faThList} className="mr-2" />
                            Items
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/weather">
                            <FontAwesomeIcon icon={faWind} className="mr-2" />
                            Weather
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link onClick={this.onLogoutHandler}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default withRouter(SideNavbar);
