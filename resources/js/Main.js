import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home/Home";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch,
} from "react-router-dom";
import DisplayItems from "./components/Items/DisplayItems";
import DisplayUsers from "./components/Users/DisplayUsers";
import DisplayWeather from "./components/Weather/DisplayWeather";
import SideNavbar from "./components/Navigation/SideNavbar";

export default class App extends Component {
    render() {
        const login = localStorage.getItem("isLoggedIn");
        return (
            <div className="App">
                {login ? (
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/items" component={DisplayItems} />
                        <Route path="/users" component={DisplayUsers} />
                        <Route path="/weather" component={DisplayWeather} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/" component={Signup} />
                        <Route path="/sign-in" component={Signin} />
                    </Switch>
                )}

                {/* {login ? (
                    <Router>
                        <Route exact path="/" component={Signup}></Route>
                        <Route path="/sign-in" component={Signin}></Route>
                        <Route path="/home" component={Home}></Route>
                    </Router>
                ) : (
                    <Router>
                        {navLink}
                        <Route exact path="/" component={Signup}></Route>
                        <Route path="/sign-in" component={Signin}></Route>
                        <Route path="/home" component={Home}></Route>
                    </Router>
                )} */}
            </div>
        );
    }
}
