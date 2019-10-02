import React from 'react'
import IssueDisplay from './IssueDisplay'
import styles from './css/IssuePanel.module.css'

export default function IssuePanel (props) {
  const { issues, contest } = props

  if (!issues || !contest) return null

  const contestIssues = issues.filter(item => contest.issues.includes(item._id))

  return (
    <div className={styles.container}>
      {contestIssues.map(item => (<IssueDisplay key={item._id} issue={item} contest={contest} />))}
    </div>
  )
}
