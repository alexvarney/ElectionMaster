import {connect} from 'react-redux';
import React, { Component } from 'react'
import styles from './css/CandidatePanel.module.css';
import moment from 'moment';
import CandidatePanelCircle from './CandidatePanelCircle';
import CandidatePositionCard from './CandidatePositionCard';
import {getPolling} from './_helpers';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import NumberFormat from 'react-number-format';
import {Button} from 'reactstrap';
import PopoverButton from './PopoverButton';

class CandidatePanel extends Component {

    getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    isLoggedIn = () => {
        return this.props.user.token !== null && this.props.user.token !== "";
    }

    render() {

        const candidate = this.props.candidates.candidates ?this.props.candidates.candidates.filter((item)=>item._id === this.props.candidates.selectedCandidateId)[0]:null;

        const selectedContest = this.props.contests.contests.filter(item => item._id === this.props.contests.selectedContestId)[0]

        if(!candidate || !selectedContest) return (
            <div>
                <Button outline color="primary" block onClick={this.props.toggle}  className={styles.mobileSelect}>Select Candidate</Button>
            </div>
        );
        
        //Get the rank of the candidate in the polls
        const pollingValues = selectedContest.candidates.map(candidateId => ({candidateId, value: getPolling(candidateId, selectedContest)})).sort((a,b)=>a.value < b.value ? 1 : -1);
        
        const thisPollValue = pollingValues.filter(item => item.candidateId === candidate._id)[0];

        const rank = pollingValues.indexOf(thisPollValue) + 1;

        const {name, state, dob, slogan, description, website, websiteDisplay, partyAffiliation, netWorth, image} = candidate;
        
        const polling = thisPollValue.value;

        const age = moment().diff(dob, 'years');
        
        const getSubtleColor = () => `hsla(${this.getRandomIntInclusive(0,360)},42%,22%,1.0)`;
        
        const getButtonStyle = () => {
            return {backgroundColor: getSubtleColor()}
        };

        const getCircleStyle = () => {
            
            return (image) ? 
                {
                    backgroundImage: `url(${process.env.PUBLIC_URL}` + `/headshots/${image})`,
                    backgroundSize: 'cover',
                    border: '2px solid black',
                } 
            : getButtonStyle();
        }
        
        return (
            <div className={styles.candidatePanel}>
                <div className={styles.container}>
                    <Button block outline color="primary" onClick={this.props.toggle} className={styles.mobileSelect}>Select Candidate</Button>

                    <div className={styles.headingRow}>
                        <div className={styles.circleContainer}>
                            <CandidatePanelCircle style={getCircleStyle()} containerStyle={styles.circleContainer}>
                                <span className={styles.circlePolling}>#{rank}</span>
                            </CandidatePanelCircle>
                        </div>
                        <div className={styles.titleContainer}>
                            <h1>{name}</h1>
                            <h3>{slogan}</h3>
                        </div>
                    </div>
                    <div className={styles.buttonRow}>
                        <div>
                            <PopoverButton tooltipText="Rank" style={getButtonStyle()}>
                                <span className={styles.rankButton}><i className="fas fa-poll-h"></i> #{rank}</span>
                            </PopoverButton>
                        </div>
                        <div>
                            <PopoverButton tooltipText="Polling" style={getButtonStyle()}>
                                <span><i className="fas fa-percentage"></i> {polling}%</span>
                            </PopoverButton>
                        </div>
                        <div>
                            <PopoverButton tooltipText="Website" style={getButtonStyle()}>
                                <a className="panel-websiteLink" target="_blank" href={website}><i className="fas fa-window-restore"></i>{websiteDisplay}</a>
                            </PopoverButton>
                        </div>
                        <div>
                            <PopoverButton tooltipText="Age" style={getButtonStyle()}>
                                <i className="fas fa-birthday-cake"></i> {age}
                            </PopoverButton>
                        </div>
                        <div>
                            <PopoverButton tooltipText="Party Affiliation" style={getButtonStyle()}>
                            <i className="fas fa-certificate"></i> {partyAffiliation}
                            </PopoverButton>
                        </div>
                        <div>
                        <PopoverButton tooltipText="State" style={getButtonStyle()}>
                                <i className="fas fa-location-arrow"></i>{state}
                        </PopoverButton>
                        </div>
                        {netWorth ? <div>
                            <PopoverButton tooltipText="Net Worth" style={getButtonStyle()}>
                                <i className="fas fa-search-dollar"></i><NumberFormat value={netWorth} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </PopoverButton>
                        </div> : null}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.col}>
                            <div className={styles.headingContainer}>
                                <h2 className={styles.heading}>Positions</h2>
                            </div>
                            {candidate.positions.map(position=>{
                                return (<CandidatePositionCard key={position._id} position={position} issues={this.props.issues.issues}/>)
                            })}
                        </div>
                        <div className={styles.aboutContainer}> 
                            <h2 className={styles.heading}>About</h2>
                            <ReactMarkdown source={description} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {})(CandidatePanel);