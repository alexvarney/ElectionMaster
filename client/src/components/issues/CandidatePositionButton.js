import React, { useState, useRef } from 'react'
import styles from './css/CandidatePositionButton.module.css'
import { Tooltip } from 'reactstrap'
import { getSubtleColor } from '../_helpers'

export default function CandidatePositionButton (props) {
  const { name, image, status, colors } = props.candidate

  const [hoverStatus, onHover] = useState(false)
  const parentRef = useRef(null)

  const primaryColor = colors ? colors.filter(item => item.name === 'primary')[0] : null

  const [backgroundColor, setBackgroundColor] = useState(primaryColor ? primaryColor.value : getSubtleColor())

  const spaceIndex = name.indexOf(' ')
  const initials = name.charAt(0) + '.' + name.slice(spaceIndex)

  const computedStyle = () => {
    if (
      status.toLowerCase() === 'declared' ||
      status.toLowerCase() === 'active'
    ) {
      return {
        backgroundColor,
        color: '#fff'
      }
    } else {
      return {
        backgroundColor: '#616161',
        color: '#9e9e9e'
      }
    }
  }

  return (
    <div
      style={computedStyle()}
      className={styles.container}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      ref={parentRef}
    >
      {image ? (
        <img
          alt={name}
          className={styles.imgStyle}
          src={process.env.PUBLIC_URL + `/headshots/${image}`}
        />
      ) : null}

      <span>{initials}</span>

      {parentRef.current ? (
        <Tooltip
          placement='auto'
          isOpen={hoverStatus}
          target={parentRef.current}
        >
          {name}
        </Tooltip>
      ) : null}
    </div>
  )
}
