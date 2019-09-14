import {connect} from 'react-redux';
import React from 'react'
import styles from './css/CandidatePanel.module.css';
import moment from 'moment';
import CandidatePanelCircle from './CandidatePanelCircle';
import CandidatePositionCard from './CandidatePositionCard';
import {getPolling, getSubtleColor} from '../_helpers';
import ReactMarkdown from 'react-markdown';
import NumberFormat from 'react-number-format';
import {Button} from 'reactstrap';
import PopoverButton from './PopoverButton';
import {setSelectedContestId} from '../../actions/contestActions';

const CandidatePanel = (props) => {

    const candidate = props.candidates.candidates ? props.candidates.candidates.filter((item)=>item._id === props.candidates.selectedCandidateId)[0]:null;

    let selectedContest = props.contests.contests ? props.contests.contests.filter(item => item._id === props.contests.selectedContestId)[0] : null;

    if(!candidate || !selectedContest) return (
        <div>
            <Button outline color="primary" block onClick={props.toggle}  className={styles.mobileSelect}>Select Candidate</Button>
        </div>
    );

    if(!Array.from(selectedContest.candidates).includes(candidate._id)){
        
        const newContest = props.contests.contests.filter(item => Array.from(item.candidates).includes(candidate._id))[0]

        if(!newContest) return null;

        selectedContest = newContest;
        props.setSelectedContestId(newContest._id);

    }
    
    //Get the rank of the candidate in the polls
    const pollingValues = selectedContest.candidates.map(candidateId => ({candidateId, value: getPolling(candidateId, selectedContest)})).sort((a,b)=>a.value < b.value ? 1 : -1);

    const pollingObject = pollingValues.filter(item => item.candidateId === candidate._id)[0];
    const polling = pollingObject.value;

    const rank = pollingValues.indexOf(pollingObject) + 1;

    const {name, state, dob, slogan, description, website, websiteDisplay, partyAffiliation, netWorth, image} = candidate;

    const age = moment().diff(dob, 'years');
    
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
                <Button block outline color="primary" onClick={props.toggle} className={styles.mobileSelect}>Select Candidate</Button>

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
                            return (<CandidatePositionCard key={position._id} position={position} issues={props.issues.issues}/>)
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


const mapStateToProps = (state) => ({
    candidates: state.candidates,
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {setSelectedContestId})(CandidatePanel);