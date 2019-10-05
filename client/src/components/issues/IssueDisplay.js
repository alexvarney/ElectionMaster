import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './css/IssueDisplay.module.css'
import ReactMarkdown from 'react-markdown'
import CandidatePositionButton from './CandidatePositionButton'
import PositionSupportChart from './PositionSupportChart'
import CandidatePositionButtonContainer from './CandidatePositionButtonContainer'
import classNames from 'classnames'
import { Badge } from 'reactstrap'

const IssueDisplay = props => {
  const candidates = props.candidates
  const { issue, contest } = props

  const [shortenDescription, setShortenDescription] = useState(true)
  const toggleDescription = () => setShortenDescription(!shortenDescription)

  const [isPositionExpanded, setPositionExpanded] = useState(false)
  const togglePositionExpand = () => setPositionExpanded(!isPositionExpanded)

  if (!(candidates && issue && contest)) return null

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
    .filter(
      item =>
        item &&
        (item.candidate.status.toLowerCase() === 'declared' ||
          item.candidate.status.toLowerCase() === 'active')
    )
    .reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.position.status]) {
        accumulator[currentValue.position.status] = []
      }
      accumulator[currentValue.position.status].push(currentValue)

      return accumulator
    }, {})

  for (const [key, value] of Object.entries(positions)) {
    positions[key] = value.sort((a, b) =>
      a.candidate.status > b.candidate.status ? 1 : -1
    )
  }

  const { supports, mixed, opposed, unknown } = positions

  const backgroundColors = {
    supports: '#B1DE9C',
    mixed: '#F5DF9F',
    opposed: '#EBA598',
    unknown: '#BFBFBF'
  }

  const textColors = {
    supports: '#1f3913',
    mixed: '#453607',
    opposed: '#40140d',
    unknown: '#262626'
  }

  let descriptionText = (shortenDescription) ? issue.description.slice(0, 250) : issue.description

  if (shortenDescription && issue.description.length > 250) {
    descriptionText = descriptionText + '...'
  }

  return (
    <div className={styles.container}>
      <h2>{props.issue.name}</h2>

      <hr />

      <div className={styles.tags}>
        {issue.tags
          ? issue.tags.map(tag => (
            <Badge key={tag} color='primary' pill>
              {tag}
            </Badge>
          ))
          : null}
      </div>

      <ReactMarkdown
        source={descriptionText}
        className={
          shortenDescription
            ? styles.descriptionText_short
            : styles.descriptionText
        }
      />

      <span className={styles.expandLink} onClick={toggleDescription}>
        View {shortenDescription ? 'More' : 'Less'}
      </span>

      <div className={styles.pieChart}>
        <PositionSupportChart positions={positions} colors={backgroundColors} />
      </div>

      <div
        className={classNames({
          [styles.positionContainer]: true,
          [styles.positionContainer_hidden]: !isPositionExpanded
        })}
      >
        {supports && supports.length > 0 ? (
          <CandidatePositionButtonContainer
            candidates={supports.map(item => item.candidate)}
            title='Supports'
            style={{
              backgroundColor: backgroundColors.supports,
              color: textColors.supports
            }}
          />
        ) : null}
        {mixed && mixed.length > 0 ? (
          <div
            style={{
              backgroundColor: backgroundColors.mixed,
              color: textColors.mixed
            }}
          >
            <h4>Mixed - ({mixed.length})</h4>
            {mixed.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))}
          </div>
        ) : null}
        {opposed && opposed.length > 0 ? (
          <div
            style={{
              backgroundColor: backgroundColors.opposed,
              color: textColors.opposed
            }}
          >
            <h4>Opposed - ({opposed.length})</h4>
            {opposed.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))}
          </div>
        ) : null}
        {unknown && unknown.length > 0 ? (
          <div
            style={{
              backgroundColor: backgroundColors.unknown,
              color: textColors.unknown
            }}
          >
            <h4>Unknown - ({unknown.length})</h4>
            {unknown.map(item => (
              <CandidatePositionButton
                key={item.candidate._id}
                candidate={item.candidate}
              />
            ))}
          </div>
        ) : null}
      </div>
    
      <span className={styles.expandLink} onClick={togglePositionExpand}>
        {!isPositionExpanded ? 'Show' : 'Hide'} Candidate Positions
      </span>
    
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
