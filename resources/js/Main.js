import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import DisplayItems from "./components/Items/DisplayItems";
import DisplayUsers from "./components/Users/DisplayUsers";
import DisplayWeather from "./components/Weather/DisplayWeather";
import PrivateRouter from "./PrivateRouter";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Signup} />
                    <Route path="/sign-in" component={Signin} />
                    <Route path="/sign-in/facebook" component={Home} />
                    <PrivateRouter path="/home" component={Home} />
                    <PrivateRouter path="/items" component={DisplayItems} />
                    <PrivateRouter path="/users" component={DisplayUsers} />
                    <PrivateRouter path="/weather" component={DisplayWeather} />
                </Switch>
            </div>
        );
    }
}
