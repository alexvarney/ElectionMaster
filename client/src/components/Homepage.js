import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getContests } from '../actions/contestActions'

const Homepage = props => {
  useEffect(() => {
    props.getContests()
  }, [])

  return (
    <div>
      <h1>Welcome to ElectionsMaster</h1>

      <p>This is the Homepage</p>

      <ul>
        {props.contests.contests.map(contest => (
          <li key={contest._id}>
            <Link to={`/${contest.country}/${contest.url}`}>
              {contest.name}
            </Link>
          </li>
        ))}
      </ul>
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
