import React, {Component} from 'react';

import Navbar from './components/Navbar';

import {Provider} from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CandidateView from './components/CandidateView';

export default class App extends Component {
  render() {
    return (
      <Router>
      <Provider store={store}>
        <div className="app">
          <Navbar />
          <Route path="/candidates" component={CandidateView} />
        </div>
      </Provider>
      </Router>
    )
  }
}
