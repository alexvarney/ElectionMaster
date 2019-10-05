import React from 'react'
import CandidatePositionButton from './CandidatePositionButton'

export default function CandidatePositionButtonContainer (props) {
  const { candidates, title } = props

  return (
    <div className={props.className} style={props.style}>
      <h4>{title} - ({candidates.length})</h4>
      {candidates ? candidates.map(candidate => <CandidatePositionButton key={candidate._id} candidate={candidate} />) : null}
    </div>
  )
}
