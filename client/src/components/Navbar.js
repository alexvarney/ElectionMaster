import React, {Component, Fragment, useState, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux';
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Alert, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, UncontrolledDropdown} from 
'reactstrap';

import {getCandidates, setSelected} from '../actions/candidateActions';
import {getIssues} from '../actions/issueActions';
import {getContests, setSelectedContestId} from '../actions/contestActions'; 

const AppNavbar = (props) => {

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
    <div className={styles.navbar}>
    
    <Navbar color="light" light expand="md">
      
      <NavbarBrand tag={Link} to="/">ElectionsMaster</NavbarBrand>
      <NavbarToggler onClick={toggleMobileExpand} />
      
      <Collapse isOpen={isMobileExpanded} navbar>
        <Nav className="ml-auto" navbar>
          
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret outline>
              {selectedContest ? selectedContest.name : 'No Election Selected'}
            </DropdownToggle>
            <DropdownMenu right>
            {props.contests.contests.map(contest => (
              <DropdownItem key={contest._id} onClick={()=>setSelectedContest(contest._id)}>
                {contest.name}
              </DropdownItem>
            ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          
          <NavItem>
            <NavLink href="#" onClick={refreshData} outline><i className="fas fa-sync-alt"></i></NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink tag={Link} to="/candidates/">Candidates</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink tag={Link} to="/issues/">Issues</NavLink>
          </NavItem>

          {props.user.token !== "" ?
          <NavItem>
            <NavLink tag={Link} to="/editcontests">Contest Editor</NavLink>
          </NavItem> : null}
          
          <Login />

        </Nav>
      </Collapse>
    </Navbar>
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
  })(AppNavbar));

