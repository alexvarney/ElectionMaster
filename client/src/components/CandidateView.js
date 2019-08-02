import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import Sidebar from './Sidebar';
import CandidatePanel from './CandidatePanel';
import CandidateEditForm from './CandidateEditForm';

import {getIssues} from '../actions/issueActions';
import {getItems} from '../actions/candidateActions';

import styles from './css/CandidateView.module.css';


class CandidateView extends Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getItems();
        this.props.getIssues();
    }

    render() {

        const {match} = this.props;

        return (
            <div>
                <Route exact path={`${match.path}/edit`} component={CandidateEditForm} />
                <div className={styles.candidateView}>
                    <Sidebar />
                    <CandidatePanel match={match}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getIssues, getItems})(CandidateView);