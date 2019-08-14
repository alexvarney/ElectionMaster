import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {Button} from 'reactstrap';

import Sidebar from './Sidebar';
import CandidatePanel from './CandidatePanel';
import CandidateEditForm from './CandidateEditForm';
import PositionEditForm from './PositionEditForm';

import {getIssues} from '../../actions/issueActions';
import {getCandidates, setSelected} from '../../actions/candidateActions';

import styles from './css/CandidateView.module.css';


class CandidateView extends Component {

    constructor(props){
        super(props);

        this.state = {
            expandSelect: false,
        }

    }

    componentDidMount(){
        this.props.getIssues();
        this.props.getCandidates();
    }

    toggleSidebar = () => {
        this.setState(prevState=>({expandSelect: !prevState.expandSelect}));
    }

    getSidebarStyle = () => {
        const style = (this.state.expandSelect) ? styles.sidebar_expanded : styles.sidebar_hidden
        return style;
    }

    setSelectedCandidate = (candidate) => {
        this.props.setSelected(candidate);
        this.setState({expandSelect: false});
    }

    render() {

        const {match} = this.props;

        if(match.url.endsWith('/')){
            return <Redirect to={match.url.slice(0,-1)} />
        }

        return (
            <div>
                <Route exact path={`${match.path}/edit`} component={CandidateEditForm} />
                <Route exact path={`${match.path}/editpositions`} component={PositionEditForm} />
                <div className={styles.candidateView}>
                    <Sidebar onSelect={this.setSelectedCandidate} className={this.getSidebarStyle()}/>
                    <CandidatePanel toggle={this.toggleSidebar} match={match}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getIssues, getCandidates, setSelected})(CandidateView);