import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { getPolling } from '../_helpers'
import CandidateSidebarCard from './CandidateSidebarCard'
import styles from './css/Sidebar.module.css'
import { getCandidateById } from '../_helpers.js'

const Sidebar = props => {
  const [redirect, setRedirect] = React.useState(null)

  const { selectedContest, candidates } = props

  const onSelect = props.onSelect
    ? props.onSelect
    : id => {
      const candidate = getCandidateById(id, candidates)

      if (candidate) {
        const url = candidate.urlSlug ? candidate.urlSlug : candidate._id

        setRedirect(
          <Redirect
            to={`/${selectedContest.country}/${selectedContest.url}/candidates/${url}`}
          />
        )
      }
    }

  // filter candidates to the ones in the contest
  let contestCandidates =
    props.candidates && selectedContest
      ? props.candidates.filter(candidate =>
        selectedContest.candidates.includes(candidate._id)
      )
      : null

  // Get polling values
  if (contestCandidates) {
    contestCandidates = contestCandidates.map(candidate => ({
      ...candidate,
      polling: getPolling(candidate._id, selectedContest)
    }))
  }

  return (
    <div className={props.className}>
      {redirect || null}
      <Scrollbars className={styles.scrollContainer} autoHide>
        <h3 className={styles.statusHeading}>Active Candidates</h3>

        {contestCandidates
          ? contestCandidates
            .filter(
              candidate =>
                candidate.status.toLowerCase() === 'active' ||
                  candidate.status.toLowerCase() === 'declared'
            )
            .sort((a, b) => (a.polling > b.polling ? -1 : 1))
            .map(candidate => (
              <CandidateSidebarCard
                key={candidate._id}
                candidate={candidate}
                onSelect={onSelect}
                selected={
                  !!(
                    props.selectedCandidate &&
                      props.selectedCandidate._id === candidate._id
                )
                }
              />
            ))
          : null}

        <h3 className={styles.statusHeading}>Inactive Candidates</h3>

        {contestCandidates
          ? contestCandidates
            .filter(
              candidate =>
                candidate.status.toLowerCase() !== 'active' &&
                  candidate.status.toLowerCase() !== 'declared'
            )
            .sort((a, b) => (a.polling > b.polling ? -1 : 1))
            .map(candidate => (
              <CandidateSidebarCard
                key={candidate._id}
                candidate={candidate}
                onSelect={onSelect}
                selected={
                  props.selectedCandidate &&
                    props.selectedCandidate._id === candidate._id
                }
              />
            ))
          : null}
      </Scrollbars>
    </div>
  )
}

const mapStateToProps = state => ({
  candidates: state.candidates.candidates,
  contests: state.contests,
  user: state.user
})

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Sidebar)
)
