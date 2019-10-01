import React, { useState } from 'react';
import styles from './css/ContestIssueEditor.module.css';

import { Input, Row, Button, Col } from 'reactstrap';
import IssueSearch from './IssueSearch';
import IssueEditForm from '../issues/IssueEditForm';

export default function ContestIssueEditor (props) {
  const { issues, selectedContest, setSelectedContest } = props

  const getIssueById = id => issues.filter(item => item._id === id)[0]

  const getIssueList = () =>
    selectedContest
      ? selectedContest.issues
        .map(id => getIssueById(id))
        .filter(item => item && item._id)
      : []

  const addIssueId = id => {
    const issueList = [...selectedContest.issues, id]

    setSelectedContest({
      ...selectedContest,
      issues: issueList
    })
  };

  const removeIssueById = id => {
    const newList = selectedContest.issues.filter(item => item !== id)
    setSelectedContest({
      ...selectedContest,
      issues: newList
    })
  };

  const toggleIssue = id => {
    if (selectedContest.issues.includes(id)) {
      removeIssueById(id)
    } else {
      addIssueId(id)
    }
  }

  const [searchResults, setSearchResults] = useState([])
  const [selectedIssue, setSelectedIssue] = useState({})

  return (
    <div>
      <Row>
        <Col>
          <IssueSearch
            contest={selectedContest}
            issues={issues}
            setSearchResults={setSearchResults}
          />
          <ul className={styles.issueList}>
            {searchResults.map(issue => (
              <li key={issue._id} onClick={() => setSelectedIssue(issue)} className={selectedIssue && selectedIssue._id === issue._id ? styles.listItemActive : ''}>
                <span>{issue.name}</span>
                <input
                  type='checkbox'
                  checked={selectedContest.issues.includes(issue._id)}
                  onChange={() => toggleIssue(issue._id)}
                />
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <IssueEditForm selectedIssue={selectedIssue} />
        </Col>
      </Row>
    </div>
  )
}
