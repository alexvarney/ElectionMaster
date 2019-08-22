import {connect} from 'react-redux';
import React, { Component } from 'react'
import styles from './css/CandidatePanel.module.css';
import moment from 'moment';
import CandidatePanelCircle from './CandidatePanelCircle';
import CandidatePositionCard from './CandidatePositionCard';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Scrollbars} from 'react-custom-scrollbars';
import NumberFormat from 'react-number-format';
import {Button, Tooltip} from 'reactstrap';
import PopoverButton from './PopoverButton';
import uuid from 'short-uuid';

class CandidatePanel extends Component {

    constructor(props){
        super(props);
        this.state={
            popovers: {
                affiliation: false,
                state: false,
                netWorth: false,
            }
        }
    }

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

        if(!candidate) return (
            <div>
                <Button outline color="primary" block onClick={this.props.toggle}  className={styles.mobileSelect}>Select Candidate</Button>
            </div>
        );

        const sorted = this.props.candidates.candidates.sort((a,b)=>(a.polling>b.polling)?-1:1);

        const rank = sorted.indexOf(candidate) + 1;

        const {name, state, dob, slogan, polling, description, website, websiteDisplay, partyAffiliation, netWorth} = candidate;
    
        const age = moment().diff(dob, 'years');

        const getButtonStyle = () => {
            return {
                backgroundColor: `hsla(${this.getRandomIntInclusive(0,360)},42%,22%,1.0)`
            }
        }

        const circleBg = {
            ...getButtonStyle(),
            minWidth: '90px',
        };

        const togglePopover = (id) => {
            this.setState(prevState=>({
                popovers: {
                    ...prevState.popovers,
                    [id]: !prevState.popovers[id],
                }
            }))
        }
        
        return (
            <div className={styles.candidatePanel}>
                <div className={styles.container}>
                    <Button block outline color="primary" onClick={this.props.toggle} className={styles.mobileSelect}>Select Candidate</Button>

                    <div className={styles.row}>
                        <CandidatePanelCircle style={circleBg}>
                            <span className={styles.circlePolling}>{Math.floor(polling)}%</span>
                            <span>#{rank}</span>
                        </CandidatePanelCircle>
                        <div className={styles.titleContainer}>
                            <h1>{name}</h1>
                            <h3>{slogan}</h3>
                        </div>
                    </div>
                    <div className={styles.buttonRow}>
                        <div>
                            <PopoverButton tooltipText="Website" style={getButtonStyle()}>
                                <a className="panel-websiteLink" href={website}>{websiteDisplay}</a>
                            </PopoverButton>
                        </div>

                        <div>
                            <PopoverButton tooltipText="Age" style={getButtonStyle()}>
                                Age: {age}
                            </PopoverButton>
                        </div>
                        <div>
                            <PopoverButton tooltipText="Party Affiliation" style={getButtonStyle()}>
                                {partyAffiliation}
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
                        
                        {this.isLoggedIn() ? <div style={getButtonStyle()} className={styles.panelButton}>
                                <Link to={`${this.props.match.url}/edit`}>Edit</Link>
                            </div>: null}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.col}>
                            <div className={styles.headingContainer}>
                                <h2 className={styles.heading}>Positions</h2>

                                {this.isLoggedIn() ? 
                                    <div className={styles.positionEdit}>
                                        <Link style={getButtonStyle()} className={styles.panelButton} to={`${this.props.match.url}/editpositions`}>Edit</Link>
                                    </div>:null}
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
})

export default connect(mapStateToProps, {})(CandidatePanel);