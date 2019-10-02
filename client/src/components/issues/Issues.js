import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getIssues } from '../../actions/issueActions'
import { getContests } from '../../actions/contestActions'
import { ContestContext } from '../contest/ContestProvider'

import IssueDisplay from './IssueDisplay'

import styles from './css/Issues.module.css'
import IssuePanel from './IssuePanel'

const Issues = props => {
  const { match } = props

  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    if (!props.issues.issues) {
      props.getIssues()
    }
    if (!props.contests.contests) {
      props.getContests()
    }
  }, [])

  useEffect(() => {
    if (selectedIssue) {
      const updatedIssue = props.issues.issues.filter(
        item => item._id === selectedIssue._id
      )[0]
      if (updatedIssue) {
        setSelectedIssue(updatedIssue)
      }
    }
  }, [props.issues.issues])

  return (
    <ContestContext.Consumer>
      {selectedContest => (
        <div className={styles.container}>
          <div className={styles.content}>
            <IssuePanel contest={selectedContest} issues={props.issues.issues} />
          </div>
        </div>
      )}
    </ContestContext.Consumer>
  )
};

const mapStateToProps = state => ({
  issues: state.issues,
  user: state.user,
  contests: state.contests
})

export default connect(
  mapStateToProps,
  { getIssues, getContests }
)(Issues)
