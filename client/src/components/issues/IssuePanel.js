import React from 'react';
import styles from './css/IssuePanel.module.css';
import ReactMarkdown from 'react-markdown';

export default (props) => {
  return (
    <div>
      <h1>{props.issue.name}</h1>
      <ReactMarkdown source={props.issue.description} />
    </div>
  )
}
