import React, {Component, Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux';
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';

import {getCandidates} from '../actions/candidateActions';
import {getIssues} from '../actions/issueActions';
import {getContests, setSelectedContestId} from '../actions/contestActions'; 

const Navbar = (props) => {

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

  const [isMobileExpanded, setMobileExpanded] = useState(false);
  const toggleMobileExpand = () => setMobileExpanded(!isMobileExpanded);
  const closeMobileExpand = () => setMobileExpanded(false);

  const [isContestDropdownOpen, setContestDropdownState] = useState(false);

  const selectedContest = props.contests.contests.filter(item => item._id === props.contests.selectedContestId)[0]

  return (
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
                <DropdownItem key={contest._id} onClick={()=>props.setSelectedContestId(contest._id)}>{contest.name}</DropdownItem>
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

        <div className={styles.loginContainer}>
          <Login />
        </div>
      </nav>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  contests: state.contests,
})

export default connect(mapStateToProps, {getCandidates, getIssues, getContests, setSelectedContestId})(Navbar)

