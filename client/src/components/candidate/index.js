import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import Sidebar from './Sidebar';
import CandidatePanel from './CandidatePanel';
import CandidateEditForm from './CandidateEditForm';
import PositionEditForm from './PositionEditForm';

import {getIssues} from '../../actions/issueActions';
import {getCandidates} from '../../actions/candidateActions';

import styles from './css/CandidateView.module.css';


class CandidateView extends Component {

    componentDidMount(){
        this.props.getIssues();
        this.props.getCandidates();
    }

    render() {

        const {match} = this.props;

        return (
            <div>
                <Route exact path={`${match.path}/edit`} component={CandidateEditForm} />
                <Route exact path={`${match.path}/editpositions`} component={PositionEditForm} />
                <div className={styles.candidateView}>
                    <Sidebar />
                    <CandidatePanel match={match}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getIssues, getCandidates})(CandidateView);