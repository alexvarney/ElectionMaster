import React from 'react'
import Sidebar from '../candidate/Sidebar'
import styles from './css/ContestHome.module.css'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import PollingGraph from './PollingGraph'

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
        <div className={styles.bannerContainer}>
          <img src={contest.bannerImage} />
        </div>
        <h1>{contest.name}</h1>
        <ul className={styles.links}>
          <li><Link to={`/${contest.country}/${contest.url}/`}>Candidates</Link></li>
          <li><Link to={`/${contest.country}/${contest.url}/issues`}>View the Issues</Link></li>
        </ul>
        <ReactMarkdown source={contest.description} />
        <PollingGraph contest={contest} />
      </div>
    </div>
  )
}
