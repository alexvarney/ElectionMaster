import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/HomepageContestPanel.module.css'
import { getPolling, getCandidateById } from './_helpers'
import { connect } from 'react-redux'
import { getCandidates } from '../actions/candidateActions'
import CandidatePositionButton from './issues/CandidatePositionButton'

function HomepageContestPanel (props) {
  const { contest, candidates } = props

  useEffect(() => {
    props.getCandidates()
  }, [])

  const contestCandidates = contest && candidates ? contest.candidates.map(item => ({
    ...getCandidateById(item, candidates),
    polling: getPolling(item, contest)
  })).sort((a,b) => a.polling < b.polling ? 1 : -1) : []

  const leading = contestCandidates.slice(0, 3).sort(item => item.polling)

  return (
    <div className={styles.container}>

      <Link className={styles.imageContainer} to={`/${contest.country}/${contest.url}`}><img src={contest.bannerImage} /></Link>

      <h2>
        <Link to={`/${contest.country}/${contest.url}`}>{contest.name}</Link>
      </h2>

      <div className={styles.candidateButtons}>     
        <h3>Leading Candidates</h3>
        <ul>
          {leading.map(candidate => (
            <li key={candidate._id}>
              <CandidatePositionButton candidate={candidate} />
            </li>
          ))}
        </ul>
      </div>
      <p><Link to={`/${contest.country}/${contest.url}`}>{contest.candidates.length} Candidates</Link>,  <Link to={`/${contest.country}/${contest.url}/issues`}>{contest.issues.length} Issues</Link></p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  candidates: state.candidates.candidates
})

export default connect(mapStateToProps, { getCandidates })(HomepageContestPanel)
