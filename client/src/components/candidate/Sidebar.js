import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'reactstrap';
import {getPolling} from '../_helpers';
import CandidateSidebarCard from './CandidateSidebarCard';
import styles from './css/Sidebar.module.css';

const Sidebar = (props) => {

    const {candidates, selectedCandidateId } = props.candidates;

    //get selected contest
    const selectedContest = props.selectedContest;

    //filter candidates to the ones in the contest
    let contestCandidates = candidates && selectedContest ? candidates.filter(candidate => selectedContest.candidates.includes(candidate._id)) : null;

    //Get polling values 
    if(contestCandidates) {
        contestCandidates = contestCandidates.map(candidate => ({...candidate, polling: getPolling(candidate._id, selectedContest)}));
    }

    return (
        <div className={props.className}>
            <Scrollbars className={styles.scrollContainer} autoHide>

                {props.user.token ? 
                    <Button 
                        tag={Link} 
                        to={`${props.match.url}/add`} 
                        style={{margin:'0.5rem', width: 'calc(100% - 1rem)'}} 
                        outline>
                            Add Candidate
                    </Button> : null}
                
                <h3 className={styles.statusHeading}>Active Candidates</h3>
                
                {(contestCandidates ? contestCandidates
                    .filter(candidate => candidate.status.toLowerCase() === 'active' || candidate.status.toLowerCase() === 'declared')
                    .sort((a,b)=>(a.polling>b.polling)?-1:1)
                    .map((candidate)=>(
                        <CandidateSidebarCard key={candidate._id} candidate={candidate} selected={selectedCandidateId} onSelect={props.onSelect}/>
                )):null)}

                <h3 className={styles.statusHeading}>Inactive Candidates</h3>

                {(contestCandidates ? contestCandidates
                    .filter(candidate => candidate.status.toLowerCase() !== 'active' && candidate.status.toLowerCase() !== 'declared')
                    .sort((a,b)=>(a.polling>b.polling)?-1:1)
                    .map((candidate)=>(
                        <CandidateSidebarCard key={candidate._id} candidate={candidate} selected={selectedCandidateId} onSelect={props.onSelect}/>
                )):null)}

            </Scrollbars>
        </div>
    )
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
    contests: state.contests,
    user: state.user,
})

export default withRouter(connect(mapStateToProps, {})(Sidebar));