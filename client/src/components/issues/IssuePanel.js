import React from 'react'
import { connect } from 'react-redux'
import styles from './css/IssuePanel.module.css'
import ReactMarkdown from 'react-markdown'
import CandidatePositionButton from './CandidatePositionButton'
import PositionSupportChart from './PositionSupportChart'

const IssuePanel = props => {
  const { issue, contest, candidates } = props

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
      <h1>{props.issue.name}</h1>

      <hr />

      <div className={styles.pieChart}>
        <PositionSupportChart positions={positions} />
      </div>

      <div className={styles.positionContainer}>
        <div>
          <h4>
            <i className='far fa-check-circle' /> Supports - (
            {supports ? supports.length : 0})
          </h4>
          {supports
            ? supports.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))
            : null}
        </div>

        <div>
          <h4>
            <i className='fas fa-adjust' /> Mixed - ({mixed ? mixed.length : 0})
          </h4>
          {mixed
            ? mixed.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))
            : null}
        </div>

        <div>
          <h4>
            <i className='far fa-times-circle' /> Opposed - (
            {opposed ? opposed.length : 0})
          </h4>
          {opposed
            ? opposed.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))
            : null}
        </div>
        {unknown && unknown.length > 0 ? (
          <div>
            <h4>
            <i className="far fa-circle"></i> Unknown - (
              {unknown ? unknown.length : 0})
            </h4>
            {unknown
              ? unknown.map(item => (
                <CandidatePositionButton
                  key={item.candidate._id}
                  candidate={item.candidate}
                />
              ))
              : null}
          </div>
        ) : null}
      </div>
      <hr />
      <ReactMarkdown source={issue.description} />
    </div>
  )
}

const mapStateToProps = state => ({
  candidates: state.candidates.candidates
})

export default connect(
  mapStateToProps,
  {}
)(IssuePanel)
