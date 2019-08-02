import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSelected} from '../actions/candidateActions';

import styles from './css/Sidebar.module.css';

import CandidateListCard from './CandidateListCard';

class Sidebar extends Component {

    render() {
        const { candidates } = this.props.candidates;

        return (
            <div style={{direction: 'rtl'}} className={styles.sidebar}>
                <div style={{direction: 'ltr'}}>
                    {(candidates ? candidates.sort((a,b)=>(a.polling>b.polling)?-1:1).map((candidate)=>(
                        <CandidateListCard candidate={candidate} onSelect={this.props.setSelected}/>
                    )):null)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
})

export default connect(mapStateToProps, {setSelected})(Sidebar);