import React, {Component} from 'react';

import {Provider} from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/Navbar';
import CandidateView from './components/candidate/';
import Issues from './components/issues/Issues';
import ContestEditor from './components/ContestEditor';
import CandidateEditForm from './components/candidate/CandidateEditForm';

export default class App extends Component {

  componentDidMount() {
    
    //Fixes viewport height on mobile safari
    let fixVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--nav', '57px');
    }
    window.addEventListener('resize', fixVh);
    fixVh();
  }

  render() {
    return (
      <Router>
      <Provider store={store}>
        <div className="app">
          <AppNavbar />
          <Route exact path="/candidates" component={CandidateView} />
          <Route exact path="/candidates/add" render={
            (props) => <CandidateEditForm {...props} createNew={true} />
          }/>
          <Route path="/candidates/:id" component={CandidateView} />
          <Route path="/issues" component={Issues} />
          <Route path="/editcontests" component={ContestEditor} />
          </div>
      </Provider>
      </Router>
    )
  }
}


