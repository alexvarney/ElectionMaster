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
import ContestEditor from './components/ContestEditor';
import CandidateEditForm from './components/candidate/CandidateEditForm';

export default class App extends Component {
  render() {
    return (
      <Router>
      <Provider store={store}>
        <div className="app">
          <Navbar />
          <Route exact path="/candidates" component={CandidateView} />
          <Route exact path="/candidates/add" render={
            (props) => <CandidateEditForm {...props} createNew={true} />
          }/>
          <Route path="/candidates/:id" component={CandidateView} />
          <Route path="/editpolls" component={PollingEditor} />
          <Route path="/issues" component={Issues} />
          <Route path="/editcontests" component={ContestEditor} />
        </div>
      </Provider>
      </Router>
    )
  }
}


