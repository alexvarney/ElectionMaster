import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getContests } from '../actions/contestActions'
import HomepageContestPanel from './HomepageContestPanel'
import styles from './css/Homepage.module.css'

const Homepage = props => {
  useEffect(() => {
    props.getContests()
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>ElectionsMaster.com</h1>

        <p>Select a contest to get started.</p>
      </header>
      {props.contests.contests.map(contest => (
        <HomepageContestPanel contest={contest} />
      ))}

    </div>
  )
};

const mapStateToProps = state => ({
  contests: state.contests
})

export default connect(
  mapStateToProps,
  { getContests }
)(Homepage)
