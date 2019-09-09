import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import Sidebar from './Sidebar';
import CandidatePanel from './CandidatePanel';
import CandidateEditForm from './CandidateEditForm';
import PositionEditForm from './PositionEditForm';

import {getIssues} from '../../actions/issueActions';
import {getCandidates, setSelected} from '../../actions/candidateActions';
import {setSelectedContestId, getContests} from '../../actions/contestActions';

import styles from './css/CandidateView.module.css';


const CandidateView = (props) => {

    /* Mobile Selection Modal State */
    const [isSelectExpanded, expandSelect] = useState(false);

    const toggle = () => {expandSelect(!isSelectExpanded)}

    const setSelectedCandidate = (id) => {
        props.history.push(`/candidates/${id}`);        
        props.setSelected(id);
        expandSelect(false);
        
    }

    const getSidebarStyle = () => {
        return (isSelectExpanded) ? styles.sidebar_expanded : styles.sidebar_hidden
    }


    const {match, setSelected, getIssues, getCandidates, candidates, contests} = props;

    useEffect(()=>{
        if(match.params.id && candidates.selectedCandidateId !== match.params.id) {
            setSelectedCandidate(match.params.id);
        }
    },[match.params.id])

    /* Remove trailing '/' from URL */
    if(match.url.endsWith('/')){
        return <Redirect to={match.url.slice(0,-1)} />
    }

    return (
        <div className={styles.candidateView}>
            <Route exact path={`${match.path}/edit`} component={CandidateEditForm} />
            <Route exact path={`${match.path}/editpositions`} component={PositionEditForm} />
            <Sidebar onSelect={setSelectedCandidate} className={getSidebarStyle()}/>
            {!isSelectExpanded ? <CandidatePanel toggle={toggle} match={match}/> : null }
        </div>
    )
}


const mapStateToProps = (state) => ({
    candidates: state.candidates,
    contests: state.contests,
});

export default connect(mapStateToProps, {getIssues, getCandidates, setSelected, setSelectedContestId, getContests})(CandidateView);