import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getIssues } from '../../actions/issueActions'
import { ContestContext } from '../contest/ContestProvider'

import IssuePanel from './IssuePanel'

const Issues = props => {
  const issues = props.issues

  useEffect(() => {
    if (!props.issues.issues) {
      props.getIssues()
    }
  }, [])

  return (
    <ContestContext.Consumer>
      {selectedContest => (
        <div>
          <IssuePanel contest={selectedContest} issues={issues} />
        </div>
      )}
    </ContestContext.Consumer>
  )
};

const mapStateToProps = state => ({
  issues: state.issues.issues
})

export default connect(
  mapStateToProps,
  { getIssues }
)(Issues)
