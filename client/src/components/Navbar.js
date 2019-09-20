import React, {useState, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import Login from './Login';
import styles from './css/Navbar.module.css';
import { connect } from 'react-redux';
import {DropdownMenu, DropdownToggle, DropdownItem, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, UncontrolledDropdown} from 'reactstrap';

import {getCandidates} from '../actions/candidateActions';
import {getIssues} from '../actions/issueActions';
import {getContests} from '../actions/contestActions'; 

const AppNavbar = (props) => {

  const refreshData = () => {
    props.getCandidates();
    props.getIssues();
    props.getContests();
  }

  useEffect(() => {
    props.getCandidates();
    props.getIssues();
    props.getContests();
  }, [])

  //menu expansion for mobile layouts
  const [isMobileExpanded, setMobileExpanded] = useState(false);
  const toggleMobileExpand = () => setMobileExpanded(!isMobileExpanded);
  const closeMobileExpand = () => setMobileExpanded(false);

  const {match, selectedContest} = props;

  return (
    <div className={styles.navbar}>
    
    <Navbar color="light" light expand="md" className="sticky-top">
      
      <NavbarBrand tag={Link} to="/">ElectionsMaster</NavbarBrand>
      <NavbarToggler onClick={toggleMobileExpand} />
      
      <Collapse isOpen={isMobileExpanded} navbar>
        <Nav className="ml-auto" navbar>
          
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret outline="true">
              {selectedContest ? selectedContest.name : 'Select a contest...'}
            </DropdownToggle>
            <DropdownMenu right>
            {props.contests.contests.map(contest => (
              <DropdownItem tag={Link} key={contest._id} to={`/${contest.country}/${contest.url}`}>
                {contest.name}
              </DropdownItem>
            ))}
            </DropdownMenu>
          </UncontrolledDropdown>

          {props.user.token !== "" ?
          <NavItem>
            <NavLink disabled={!selectedContest} tag={Link} to={selectedContest?`/${selectedContest.country}/${selectedContest.url}/edit`:'#'}>Edit</NavLink>
          </NavItem> : null}
          
          <NavItem>
            <NavLink href="#" onClick={refreshData} outline="true"><i className="fas fa-sync-alt"></i></NavLink>
          </NavItem>
          
          <NavItem >
            <NavLink disabled={!selectedContest} tag={Link} to={selectedContest?`/${selectedContest.country}/${selectedContest.url}/candidates`:"#"}>Candidates</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink disabled={!selectedContest} tag={Link} to={selectedContest?`/${selectedContest.country}/${selectedContest.url}/issues`:'#'}>Issues</NavLink>
          </NavItem>


          
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
  })(AppNavbar));

