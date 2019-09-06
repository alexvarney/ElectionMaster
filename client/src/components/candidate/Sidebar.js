import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setSelected} from '../../actions/candidateActions';
import {Scrollbars} from 'react-custom-scrollbars';
import {Button} from 'reactstrap';
import {getPolling} from './_helpers';

import CandidateListCard from './CandidateListCard';

const Sidebar = (props) => {

    const { candidates, selectedCandidateId } = props.candidates;

    //get selected contest
    const selectedContest = props.contests.contests.filter(item => item._id === props.contests.selectedContestId)[0]

    //filter candidates to the ones in the contest
    let contestCandidates = candidates && selectedContest ? candidates.filter(candidate => selectedContest.candidates.includes(candidate._id)) : null;

    //Get polling values 
    if(contestCandidates) {
        contestCandidates = contestCandidates.map(candidate => ({...candidate, polling: getPolling(candidate._id, selectedContest)}));
    }

    return (
        <div className={props.className}>
            <Scrollbars autoHide>

                {props.user.token ? <Button tag={Link} to='/candidates/add/' style={{marginTop:'0.5rem'}} block color="primary" outline>Add Candidate</Button> : null}
                
                {(contestCandidates ? contestCandidates.sort((a,b)=>(a.polling>b.polling)?-1:1).map((candidate)=>(
                    <CandidateListCard key={candidate._id} candidate={candidate} selected={selectedCandidateId} onSelect={props.onSelect}/>
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

export default connect(mapStateToProps, {setSelected})(Sidebar);