import React from 'react'
import { connect } from 'react-redux'
import styles from './css/IssueDisplay.module.css'
import ReactMarkdown from 'react-markdown'
import CandidatePositionButton from './CandidatePositionButton'
import PositionSupportChart from './PositionSupportChart'

const IssueDisplay = props => {
  const candidates = props.candidates
  const { issue, contest } = props

  const positions = candidates
    .filter(candidate => contest.candidates.includes(candidate._id))
    .map(candidate => {
      const position = candidate.positions.filter(
        positions => positions.issue === issue._id
      )[0]
      return position
        ? {
          candidate,
          position
        }
        : null
    })
    .filter(item => item)
    .reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.position.status]) {
        accumulator[currentValue.position.status] = []
      }
      accumulator[currentValue.position.status].push(currentValue)

      return accumulator
    }, {})

  const supports = positions.supports
    ? positions.supports.sort((a, b) =>
      a.candidate.status > b.candidate.status ? 1 : -1
    )
    : []
  const mixed = positions.mixed
    ? positions.mixed.sort((a, b) =>
      a.candidate.status > b.candidate.status ? 1 : -1
    )
    : []
  const opposed = positions.opposed
    ? positions.opposed.sort((a, b) =>
      a.candidate.status > b.candidate.status ? 1 : -1
    )
    : []
  const unknown = positions.unknown
    ? positions.unknown.sort((a, b) =>
      a.candidate.status > b.candidate.status ? 1 : -1
    )
    : []

  const totalPositions = supports.length + mixed.length + opposed.length + unknown.length

  return (
    <div className={styles.container}>

      <div className={styles.pieChart}>
        <PositionSupportChart positions={positions} />
      </div>

      <h2>{props.issue.name}</h2>
      <hr />

      <ReactMarkdown source={issue.description} />
      
      <h3>Candidate Positions</h3>
      <div className={styles.positionContainer}>

        {supports.length > 0 ? (
          <div>
            <h4>Supports - ({supports.length})</h4>
            {supports.map(item => (<CandidatePositionButton key={item.candidate._id} candidate={item.candidate} />))}
          </div>) : null}
        {mixed.length > 0 ? (
          <div>
            <h4>Mixed - ({mixed.length})</h4>
            {mixed.map(item => (<CandidatePositionButton key={item.candidate._id} candidate={item.candidate} />))}
          </div>) : null}
        {opposed.length > 0 ? (
          <div>
            <h4>Opposed - ({opposed.length})</h4>
            {opposed.map(item => (<CandidatePositionButton key={item.candidate._id} candidate={item.candidate} />))}
          </div>) : null}
        {unknown.length > 0 ? (
          <div>
            <h4>Unknown - ({unknown.length})</h4>
            {unknown.map(item => (<CandidatePositionButton key={item.candidate._id} candidate={item.candidate} />))}
          </div>) : null}
        
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  candidates: state.candidates.candidates
})

export default connect(
  mapStateToProps,
  {}
)(IssueDisplay)
