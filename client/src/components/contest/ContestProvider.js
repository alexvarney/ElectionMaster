import React, { createContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import AppNavbar from '../Navbar'
import CandidateView from '../candidate/CandidateView'
import Issues from '../issues/Issues'
import ContestEditor from './ContestEditor'
import ContestHome from './ContestHome'

export const ContestContext = createContext({})

const ContestProvider = props => {
  const { match } = props
  const { path, params } = match

  const [selectedContest, setSelectedContest] = useState(null)

  useEffect(() => {
    const result = props.contests.contests
      .filter(contest => contest.country === params.countryID)
      .filter(contest => contest.url === params.contestURL)[0]

    if (result) {
      setSelectedContest(result)
    }
  }, [params.contestURL, params.countryID, props.contests])

  return (
    <>
      <AppNavbar selectedContest={selectedContest} />
      <Switch>
        <ContestContext.Provider value={selectedContest}>
          <Route
            exact
            path={path}
            render={props => (
              <ContestHome {...props} contest={selectedContest} />
            )}
          />
          <Route exact path={path + '/candidates'} component={CandidateView} />
          <Route path={path + '/candidates/:id'} component={CandidateView} />

          <Route path={path + '/issues'} component={Issues} />
          <Route
            path={path + '/edit'}
            render={props => (
              <ContestEditor {...props} contest={selectedContest} />
            )}
          />
        </ContestContext.Provider>
      </Switch>
    </>
  )
};

const mapStateToProps = state => ({
  contests: state.contests
})

export default connect(
  mapStateToProps,
  {}
)(ContestProvider)
