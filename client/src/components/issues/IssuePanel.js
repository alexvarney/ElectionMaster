import React, { useState } from 'react'
import IssueDisplay from './IssueDisplay'
import styles from './css/IssuePanel.module.css'
import IssueSearch from './IssueSearch'

export default function IssuePanel (props) {
  const { issues, contest } = props

  const contestIssues = (issues && contest) ? issues.filter(item => contest.issues.includes(item._id)) : []
  const allTags = contestIssues.reduce((acc, currentValue) => {
    currentValue.tags.forEach(item => {
      if (!acc.includes(item)) {
        acc.push(item)
      }
    })
    return acc
  }, [])

  const [displayedIssues, setDisplayedIssues] = useState([])

  return (
    <div className={styles.container}>
      <IssueSearch issues={contestIssues} setFilteredIssues={setDisplayedIssues} tags={allTags} />
      <div className={styles.content}>
        {displayedIssues.map(item => (<IssueDisplay key={item._id} issue={item} contest={contest} />))}
      </div>
    </div>
  )
}
