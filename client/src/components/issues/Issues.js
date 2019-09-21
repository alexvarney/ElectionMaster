import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {getIssues} from '../../actions/issueActions';
import {getContests} from '../../actions/contestActions';
import {ContestContext} from '../contest/ContestProvider';

import IssueEditForm from './IssueEditForm';
import IssuePanel from './IssuePanel';
import IssueSidebar from './IssueSidebar';

import styles from './css/Issues.module.css';

const Issues = (props) => {

    const {match} = props;

    const [selectedIssue, setSelectedIssue] = useState(null);

    useEffect(()=>{
        if(!props.issues.issues){
            props.getIssues();
        }
        if(!props.contests.contests){
            props.getContests();
        }
    },[])

    useEffect(() => {
        if(selectedIssue){
            const updatedIssue = props.issues.issues.filter(item => item._id === selectedIssue._id)[0];
            if(updatedIssue){
                setSelectedIssue(updatedIssue);
            }
        }
    }, [props.issues.issues])

    return (
        <ContestContext.Consumer>
        {selectedContest => (

        <div className={styles.container}>

            <Route path={`${props.match.path}/edit`} 
                render={(props) => <IssueEditForm {...props} selectedIssue={selectedIssue} />} />

            <div className={styles.sidebar}>
                {props.user.token ? <>
                    <div className={styles.adminNav}>
                        <Button size="sm" tag={Link} to={`${match.url}/edit`} outline>Issue Editor</Button>
                    </div> 
                    <hr />
                </>: null}

                <IssueSidebar issues={props.issues.issues} selectedContest={selectedContest} setSelectedIssue={setSelectedIssue} />      
                    
                </div>

                <div className={styles.content}>
                    {selectedIssue ? <IssuePanel issue={selectedIssue} contest={selectedContest}/> : null}
                </div>

        </div>

        )}
        </ContestContext.Consumer>

    )
  }

const mapStateToProps = (state) => ({
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {getIssues, getContests})(Issues)
