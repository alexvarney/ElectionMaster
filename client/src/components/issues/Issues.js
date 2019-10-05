import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getIssues } from '../../actions/issueActions'
import { ContestContext } from '../contest/ContestProvider'

import styles from './css/Issues.module.css'
import IssuePanel from './IssuePanel'

const Issues = props => {
  const issues = props.issues

  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    if (!props.issues.issues) {
      props.getIssues()
    }
  }, [])

  useEffect(() => {
    if (selectedIssue) {
      const updatedIssue = issues.filter(
        item => item._id === selectedIssue._id
      )[0]
      if (updatedIssue) {
        setSelectedIssue(updatedIssue)
      }
    }
  }, [issues])

  return (
    <ContestContext.Consumer>
      {selectedContest => (
        <div className={styles.container}>
          <div className={styles.content}>
            <IssuePanel contest={selectedContest} issues={issues} />
          </div>
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
