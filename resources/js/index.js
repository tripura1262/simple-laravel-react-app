import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import {
  Route,
  HashRouter,
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css'

class Index extends Component {
  render() {
    return (
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