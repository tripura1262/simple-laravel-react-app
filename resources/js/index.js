import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Route,
  HashRouter,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './Main';
import Signin from "./components/SignIn/Signin";

class Index extends Component {
  render() {
      return (
          // <BrowserRouter>
          //     <Route component={Main} />
          // </BrowserRouter>
          <HashRouter>
              <Route component={Main} />
          </HashRouter>
      );
  }
}

ReactDOM.render(<Index />, document.getElementById("example"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();