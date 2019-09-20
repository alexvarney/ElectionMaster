import React, { useEffect, useState, createContext, } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import CandidatePanel from './CandidatePanel';

import {ContestContext} from '../contest/ContestProvider';

import CandidateEditForm from './CandidateEditForm';
import PositionEditForm from './PositionEditForm';

import {getIssues} from '../../actions/issueActions';
import {getCandidates} from '../../actions/candidateActions';
import {getContests} from '../../actions/contestActions';

import styles from './css/CandidateView.module.css';

const CandidateView = (props) => {
    
    const {match, candidates} = props;
    
    /* Mobile Selection Modal State */
    const [isSelectExpanded, expandSelect] = useState(false);

    const toggle = () => {expandSelect(!isSelectExpanded)}

    const getSidebarStyle = () => {
        return (isSelectExpanded) ? styles.sidebar_expanded : styles.sidebar_hidden
    }

    /* Logic for managing currently selected Canadidate */
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const setSelectedCandidateID = (id) => {
        
        expandSelect(false);

        const result = candidates.candidates ? candidates.candidates.filter(candidate => candidate._id === id)[0] : null;

        const slug = (result && result.urlSlug) ? result.urlSlug : id;

        if(result){
            if(match.params.id){
                props.history.push(slug);
            } else {
                props.history.push(`${match.url}/${slug}`);
            }
            setSelectedCandidate(result);
        }
    }

    useEffect(() => {
        if(match.params.id){

            let result = candidates.candidates ? candidates.candidates.filter(candidate => candidate.urlSlug === match.params.id)[0] : null;
            
            if (!result) {
                result = candidates.candidates ? candidates.candidates.filter(candidate => candidate._id === match.params.id)[0] : null;
            }
            
            if(result){
                setSelectedCandidate(result);
            }
        }
    }, [match.params.id, candidates.candidates, props.contests.contests])

    return (
        <ContestContext.Consumer> 
        {(selectedContest) => (

            <div className={styles.candidateView}>

                <Route path={match.path + '/edit'} render={
                    (props) => <CandidateEditForm {...props} selectedCandidate={selectedCandidate} />
                } />

                <Route path={match.path + '/add'} render={
                    (props) => <CandidateEditForm {...props} createNew={true} />
                } />

                <Route path={match.path + '/editpositions'} render={
                    (props) => <PositionEditForm {...props} selectedContest={selectedContest} selectedCandidate={selectedCandidate} />
                } />

                <Sidebar onSelect={setSelectedCandidateID} selectedContest={selectedContest} className={getSidebarStyle()}/>
                {!isSelectExpanded ? 
                    <CandidatePanel toggle={toggle} match={match} selectedContest={selectedContest} selectedCandidate={selectedCandidate}/> 
                    : null}

            </div>

        )} 
        </ContestContext.Consumer>
    )
}


const mapStateToProps = (state) => ({
    candidates: state.candidates,
    contests: state.contests,
});

export default connect(mapStateToProps, {getIssues, getCandidates, getContests})(CandidateView);