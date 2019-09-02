import React, {Component, Fragment, useState, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux';
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Alert} from 'reactstrap';

import {getCandidates, setSelected} from '../actions/candidateActions';
import {getIssues} from '../actions/issueActions';
import {getContests, setSelectedContestId} from '../actions/contestActions'; 

const Navbar = (props) => {

  const refreshData = () => {
    props.getCandidates();
    props.getIssues();
    props.getContests();
    showAlertMessage('Refreshed...', 2700);
  }

  useEffect(() => {
    props.getCandidates();
    props.getIssues();
    props.getContests();
  }, [])

  useEffect(()=>{

    if(!props.contests.selectedContestId){

      //search for default contest
      const defaultContest = props.contests.contests.filter(item => item.default === true)[0];

      if (defaultContest) props.setSelectedContestId(defaultContest._id);

    }

  },[props.contests.contests])

  //menu expansion for mobile layouts
  const [isMobileExpanded, setMobileExpanded] = useState(false);
  const toggleMobileExpand = () => setMobileExpanded(!isMobileExpanded);
  const closeMobileExpand = () => setMobileExpanded(false);

  //Election Switcher
  const [isContestDropdownOpen, setContestDropdownState] = useState(false);
  const setSelectedContest = (id) => {
    props.setSelectedContestId(id);
    props.setSelected('');
    
    if(props.location.pathname.includes('/candidates/')){
      props.history.push('/candidates');
    }
  }

  //Alert Message
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertMessage = (message, duration) => {
    setAlertMessage(message);
    setAlertOpen(true);

    setTimeout(()=>{
      setAlertOpen(false);
    }, duration);

  }

  const selectedContest = props.contests.contests.filter(item => item._id === props.contests.selectedContestId)[0]

  return (
      <div className={styles.navContainer}>
        <nav className={isMobileExpanded ? styles.navbar_expanded : styles.navbar}>
          <div onClick={toggleMobileExpand} className={styles.mobileExpander}>
            <span className={styles.menuSelect}>
              <i className="fas fa-bars"></i>
            </span>
            <span className={styles.titleStyle}>
              {isMobileExpanded ? 'Close Menu':'ElectionsMaster'}
            </span>
          </div>

          <Link onClick={closeMobileExpand} to="/"><span className={styles.titleStyle}>ElectionsMaster</span></Link>
          
          <div className={styles.contestDropdown}>
            <Dropdown isOpen={isContestDropdownOpen} toggle={()=>setContestDropdownState(!isContestDropdownOpen)}>
              <DropdownToggle outline caret>
                {selectedContest ? selectedContest.name : 'No Election Selected'}
              </DropdownToggle>
              <DropdownMenu right>

                {props.contests.contests.map(contest => (
                  <DropdownItem key={contest._id} onClick={()=>setSelectedContest(contest._id)}>{contest.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>  
          </div>

          <Link onClick={closeMobileExpand} to="/candidates">Candidates</Link>

          <Link onClick={closeMobileExpand} to="/issues">Issues</Link>

          {props.user.token !== "" ?
            <Fragment>
              <Link onClick={closeMobileExpand} to="/issues/edit">Issue Editor</Link>
              <Link onClick={closeMobileExpand} to="/editpolls">Polling Editor</Link>
              <Link onClick={closeMobileExpand} to="/editcontests">Contest Editor</Link>
            </Fragment> : null}

          <Button size="sm" onClick={refreshData} outline><i className="fas fa-sync-alt"></i></Button>

          <div className={styles.loginContainer}>
            <Login />
          </div>
        </nav>
        
        <div className="fixed-top">
          <Alert className={styles.alert} isOpen={isAlertOpen} toggle={()=>setAlertOpen(!isAlertOpen)} color="primary">
            {alertMessage}
          </Alert>
        </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  contests: state.contests,
})

export default withRouter(connect(mapStateToProps, 
  {
    getCandidates, 
    getIssues, 
    getContests, 
    setSelectedContestId, 
    setSelected
  })(Navbar));

