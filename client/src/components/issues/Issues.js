import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {getIssues} from '../../actions/issueActions';
import {getContests} from '../../actions/contestActions';

import IssueEditForm from './IssueEditForm';
import IssuePanel from './IssuePanel';

import styles from './css/Issues.module.css';

const Issues = (props) => {

    useEffect(()=>{
        if(!props.issues.issues){
            props.getIssues();
        }
        if(!props.contests.contests){
            props.getContests();
        }
    },[])

    const [selectedIssue, setSelectedIssue] = useState(null);

    //Get selected contest issues

    const selectedContest = props.contests.contests.filter(contest=>contest._id === props.contests.selectedContestId)[0] || '';
    
    const sortedIssues = selectedContest ? props.issues.issues.filter(issue=> selectedContest.issues.includes(issue._id)).sort((a, b)=>(a.name > b.name ? 1 : -1)) : [];

    return (
        <div className={styles.container}>

            <Route exact path={`${props.match.path}/edit`} component={IssueEditForm} />

            <div className={styles.sidebar}>
                {props.user.token ? <div className={styles.adminNav}>
                    <Button size="sm" tag={Link} to="/issues/edit" outline>Issue Editor</Button>
                </div> : null}
                <ul className={styles.issueSelector}>
                    {sortedIssues.map(issue => (
                        <li onClick={()=>setSelectedIssue(issue)} key={issue._id}>{issue.name}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.content}>
                {selectedIssue ? <IssuePanel issue={selectedIssue} contest={selectedContest}/> : null}
            </div>

        </div>
    )
  }

const mapStateToProps = (state) => ({
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {getIssues, getContests})(Issues)
