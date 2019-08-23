import React, {Component} from 'react';

import Navbar from './components/Navbar';

import {Provider} from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CandidateView from './components/candidate/';
import PollingEditor from './components/PollingEditor';
import Issues from './components/issues/Issues';

export default class App extends Component {
  render() {
    return (
      <Router>
      <Provider store={store}>
        <div className="app">
          <Navbar />
          <Route exact path="/candidates" component={CandidateView} />
          <Route path="/candidates/:id" component={CandidateView} />
          <Route path="/editpolls" component={PollingEditor} />
          <Route path="/issues" component={Issues} />
        </div>
      </Provider>
      </Router>
    )
  }
}
