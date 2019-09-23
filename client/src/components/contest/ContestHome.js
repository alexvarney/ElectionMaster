import React from 'react'
import Sidebar from '../candidate/Sidebar'
import styles from './css/ContestHome.module.css'
import ReactMarkdown from 'react-markdown'

export default function ContestHome (props) {
  const { contest } = props

  if (!contest) {
    return (
      <div>
        <p>No contest selected</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} selectedContest={contest} />
      <div className={styles.panel}>
        <h1>{contest.name}</h1>
        <ReactMarkdown source={contest.description} />
      </div>
    </div>
  )
}
