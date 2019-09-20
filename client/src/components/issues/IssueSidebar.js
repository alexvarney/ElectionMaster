import React from 'react'
import styles from './css/IssueSidebar.module.css';


export default function IssueSidebar(props) {

    const {issues, selectedContest, setSelectedIssue} = props;

    const sortedIssues = issues && selectedContest ? issues.filter(issue=> selectedContest.issues.includes(issue._id)).sort((a, b)=>(a.name > b.name ? 1 : -1)) : [];

    return (
    <ul className={styles.issueSelector}>
        {sortedIssues.map(issue => (
            <li onClick={()=>setSelectedIssue(issue)} key={issue._id}>{issue.name}</li>
        ))}
    </ul>
    )
}
