import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { ContestContext } from '../contest/ContestProvider'

import styles from './css/CandidateListCard.module.css'

function CandidateSidebarCard (props) {
  const { candidate } = props

  const { image, name, polling, _id } = candidate

  const imageUrl = image.charAt(0) === '/' ? image : process.env.PUBLIC_URL + `/headshots/${image}`

  return (
    <ContestContext.Consumer>
      {selectedContest => (
        <div
          className={props.selected ? styles.active : styles.container}
          onClick={() => props.onSelect(_id)}
        >
          <div className={styles.imgContainer}>
            {image ? (
              <img
                alt={name}
                className={styles.imgStyle}
                src={imageUrl}
              />
            ) : null}
          </div>

          <div className={styles.textContainer}>
            <p className={styles.nameStyle}>{name}</p>
            <p className={styles.percentageText}>
              <span>{polling && polling > 0 ? polling + '%' : null}</span>
              <br />
            </p>
          </div>
        </div>
      )}
    </ContestContext.Consumer>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(CandidateSidebarCard)
)
