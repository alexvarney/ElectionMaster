import React, { useState } from 'react';
import Sidebar from '../candidate/Sidebar';
import styles from './css/ContestHome.module.css';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import PollingGraph from './PollingGraph';
import { Button } from 'reactstrap';

export default function ContestHome (props) {
  const { contest } = props

  const [mobileSelectExpanded, setMobileSelectExpand] = useState(false)
  const toggleMobileSelect = () => setMobileSelectExpand(!mobileSelectExpanded)

  if (!contest) {
    return (
      <div>
        <p>No contest selected</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <Button
          className={styles.mobileToggleButton}
          onClick={toggleMobileSelect}
          color='primary'
          block
          outline
        >
          {mobileSelectExpanded ? 'Close' : 'View Candidates'}
        </Button>
      </div>
      <Sidebar
        className={
          mobileSelectExpanded ? styles.sidebar_expanded : styles.sidebar_hidden
        }
        selectedContest={contest}
      />
      {!mobileSelectExpanded ? (
        <main className={styles.panel}>
          <div className={styles.bannerContainer}>
            <img src={contest.bannerImage} />
          </div>
          <h1>{contest.name}</h1>
          <ul className={styles.links}>
            <li>
              <Link to={`/${contest.country}/${contest.url}/`}>Candidates</Link>
            </li>
            <li>
              <Link to={`/${contest.country}/${contest.url}/issues`}>
                View the Issues
              </Link>
            </li>
          </ul>

          <ReactMarkdown source={contest.description} />
          <h3>Polling Data</h3>
          <div className={styles.pollingGraph}>
            <PollingGraph contest={contest} />
          </div>
        </main>
      ) : null}
    </div>
  )
}
