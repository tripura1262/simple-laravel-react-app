import React from "react";
import "./App.css";
import {  Route, Switch } from "react-router-dom";

// User is LoggedIn
// import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home/Home";
import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";
import DisplayItems from "./components/Items/DisplayItems"
import DisplayUsers from "./components/Items/DisplayUsers"

const Main = () => (
    <Switch>
        {/*User might LogIn*/}
        
        {/*User will LogIn*/}
        <Route path="/sign-in" component={Signin} />
        <Route path="/" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route path="/users" component={DisplayUsers} />
        <Route path="/items" component={DisplayItems} />
        {/* User is LoggedIn*/}
        {/* <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/users" component={DisplayUsers} />
        <PrivateRoute path="/items" component={DisplayItem} />
        <PrivateRoute path="/add-item" component={CreateItem} />
        <PrivateRoute path="/edit-item" component={EditItem} /> */}
        {/*Page Not Found*/}
        {/* <Route path="*" component={NotFound} /> */}
    </Switch>
);
export default Main;