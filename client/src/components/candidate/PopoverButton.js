import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'reactstrap'
import styles from './css/PopoverButton.module.css'

const PopoverButton = props => {
  const linkRef = useRef()
  const [isOpen, setOpen] = useState(false)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    if (linkRef.current) {
      setReady(true)
    }
  }, [])

  return (
    <div ref={linkRef} style={props.style} className={styles.panelButton}>
      {props.children}

      {isReady ? (
        <Tooltip
          placement='bottom'
          isOpen={isOpen}
          target={linkRef.current}
          toggle={() => setOpen(!isOpen)}
        >
          {props.tooltipText}
        </Tooltip>
      ) : null}
    </div>
  )
}

PopoverButton.propTypes = {
  tooltipText: PropTypes.string,
  style: PropTypes.object
}

export default PopoverButton
