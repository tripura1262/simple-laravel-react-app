import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBriefcase,
    faPaperPlane,
    faQuestion,
    faImage,
    faCopy,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Redirect, withRouter } from "react-router-dom";

class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
        };
    }

    onLogoutHandler = () => {
        localStorage.clear();
        this.props.history.push("#/sign-in");
    };

    render() {
        return (
            <div
                className={classNames("sidebar", {
                    "is-open": this.props.isOpen,
                })}
            >
                <div className="sidebar-header">
                    <Button
                        variant="link"
                        onClick={this.props.toggle}
                        style={{ color: "#fff" }}
                        className="mt-4"
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            pull="right"
                            size="xs"
                        />
                    </Button>
                    <h3>Sample Project</h3>
                </div>

                <Nav className="flex-column pt-2">
                    <Nav.Item className="active">
                        <Nav.Link href="#/home">
                            <FontAwesomeIcon className="mr-2" />
                            Home
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/users">
                            <FontAwesomeIcon className="mr-2" />
                            Users
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/items">
                            <FontAwesomeIcon className="mr-2" />
                            Items
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#/weather">
                            <FontAwesomeIcon className="mr-2" />
                            Weather
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link onClick={this.onLogoutHandler}>
                            <FontAwesomeIcon className="mr-2" />
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default withRouter(SideNavbar);
