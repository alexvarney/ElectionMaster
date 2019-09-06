import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col} from 'reactstrap';

import {getIssues} from '../../actions/issueActions';
import {getContests} from '../../actions/contestActions';

import IssueEditForm from './IssueEditForm';
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

    const [sortedIssues, setSortedIssues] = useState([]);

    //Get selected contest issues

    const selectedContest = props.contests.contests.filter(contest=>contest._id === props.contests.selectedContestId)[0] || '';

    useEffect(()=>{
        const filteredIssues = selectedContest ? props.issues.issues.filter(issue=> selectedContest.issues.includes(issue._id)) : [];
        const _sortedIssues = filteredIssues.sort((a, b)=>(a.name > b.name ? 1 : -1));
        setSortedIssues(_sortedIssues);

    },[selectedContest, selectedContest.issues, props.issues.issues])

    return (
        <div className={styles.container}>
            <Route exact path={`${props.match.path}/edit`} component={IssueEditForm} />
            {props.user.token ? <div className={styles.adminNav}>
                <Link to="/issues/edit">Issue Editor</Link>
            </div> : null}

            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col md="2">
                        <ul className={styles.issueSelector}>
                            {sortedIssues.map(issue => (
                                <li key={issue._id}><a href={`#${issue._id}`}>{issue.name}</a></li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        {sortedIssues.map(issue => {
                            return (
                                <div key={issue._id} id={issue._id} className={styles.issue}>
                                    <h3>{issue.name}</h3>
                                    <ReactMarkdown className={styles.description} source={issue.description} />
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }

const mapStateToProps = (state) => ({
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {getIssues, getContests})(Issues)
