
import React, { useEffect } from 'react'

import { Provider } from 'react-redux'
import store from './store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Analytics from 'react-router-ga'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import ContestProvider from './components/contest/ContestProvider'
import Homepage from './components/Homepage'


export default function App () {
  useEffect(() => {
    // Fixes viewport height on mobile safari
    const fixVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      document.documentElement.style.setProperty('--nav', '57px')
    }

    window.addEventListener('resize', fixVh)

    fixVh()

    return () => {
      window.removeEventListener('resize', fixVh)
    }
  }, [])

  return (
    <Router>
      <Analytics id={process.env.REACT_APP_GA_TRACKING}>
        <Provider store={store}>
          <div className='app'>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/:countryID/:contestURL' component={ContestProvider} />
            </Switch>
          </div>
        </Provider>
      </Analytics>
    </Router>
  )
}