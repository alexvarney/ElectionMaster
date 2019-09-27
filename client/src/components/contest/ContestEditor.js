import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'

import {
  getContests,
  updateContest,
  addContest,
  deleteContest
} from '../../actions/contestActions'
import { getCandidates } from '../../actions/candidateActions'
import { getIssues } from '../../actions/issueActions'

import styles from './css/ContestEditor.module.css'

import ContestDetailEditor from './ContestDetailEditor'
import ContestCandidateEditor from './ContestCandidateEditor'
import ContestIssueEditor from './ContestIssueEditor'
import ContestPollingEditor from './ContestPollingEditor'
import AssetManager from './AssetManager'

const ContestEditor = props => {
  useEffect(() => {
    props.getCandidates()
    props.getContests()
    props.getIssues()
  }, [])

  const [activeTab, setActiveTab] = useState('details')

  const [selectedContest, setSelectedContest] = useState(props.contest)
  const [persistantName, setPersistantName] = useState(
    props.contest ? props.contest.name : null
  )

  useEffect(() => {
    if (props.contest) {
      setSelectedContest(props.contest)
      setPersistantName(props.contest.name)
    }
  }, [props.contest])

  const saveContest = () => {
    if (selectedContest._id) {
      props.updateContest(selectedContest)
    } else {
      props.addContest(selectedContest)
    }
  }

  const deleteContest = () => {
    if (selectedContest._id) {
      const namePrompt = window.prompt(
        `Are you sure that you want to delete this contest? If you are sure, type \`${selectedContest.name.trim()}\` `
      )
      if (namePrompt && namePrompt.trim() === selectedContest.name.trim()) {
        props.deleteContest(selectedContest)
      }
    } else {
      setSelectedContest(null)
    }
  }

  const getCandidateById = id => {
    const result = props.candidates ? props.candidates.filter(item => item._id === id)[0] : null
    return result || { unknown: true }
  };

  return (
    <div className={styles.container}>
      <h1>Contest Editor</h1>

      <h3>{persistantName || 'No Contest Selected'}</h3>

      <Nav className={styles.navContainer} tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'details' })}
            onClick={() => {
              setActiveTab('details')
            }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'candidates' })}
            onClick={() => {
              setActiveTab('candidates')
            }}
          >
            Candidates
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'issues' })}
            onClick={() => {
              setActiveTab('issues')
            }}
          >
            Issues
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'polling' })}
            onClick={() => {
              setActiveTab('polling')
            }}
          >
            Polling
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'assets' })}
            onClick={() => {
              setActiveTab('assets')
            }}
          >
            Assets
          </NavLink>
        </NavItem>

        <TabContent activeTab={activeTab}>
          <TabPane tabId='details'>
            <ContestDetailEditor
              selectedContest={selectedContest}
              setSelectedContest={setSelectedContest}
            />
          </TabPane>
          <TabPane tabId='candidates'>
            <ContestCandidateEditor
              styles={styles}
              selectedContest={selectedContest}
              setSelectedContest={setSelectedContest}
            />
          </TabPane>
          <TabPane tabId='issues'>
            <ContestIssueEditor
              styles={styles}
              issues={props.issues}
              selectedContest={selectedContest}
              setSelectedContest={setSelectedContest}
            />
          </TabPane>
          <TabPane tabId='polling'>
            <ContestPollingEditor
              styles={styles}
              selectedContest={selectedContest}
              setSelectedContest={setSelectedContest}
              getCandidateById={getCandidateById}
            />
          </TabPane>
          <TabPane tabId='assets'>
            <AssetManager />
          </TabPane>
        </TabContent>
      </Nav>
      <div className={styles.buttonRow}>
        <Button
          color='primary'
          onClick={saveContest}
          disabled={!selectedContest}
        >
          Save Contest
        </Button>
        <Button
          color='danger'
          onClick={deleteContest}
          disabled={!selectedContest}
        >
          Delete Contest
        </Button>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  contests: state.contests,
  candidates: state.candidates.candidates,
  issues: state.issues.issues
})

export default connect(
  mapStateToProps,
  {
    getContests,
    updateContest,
    addContest,
    getCandidates,
    getIssues,
    deleteContest
  }
)(ContestEditor)
