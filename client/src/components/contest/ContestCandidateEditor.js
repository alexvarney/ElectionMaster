import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from 'reactstrap'
import classnames from 'classnames'
import styles from './css/ContestCandidateEditor.module.css'
import CandidateSearch from './CandidateSearch'
import CandidateEditForm from '../candidate/CandidateEditForm'
import PositionEditForm from '../candidate/PositionEditForm'

const ContestCandidateEditor = props => {
  const { candidates, selectedContest, setSelectedContest } = props

  const sortCandidates = list =>
    list.sort((a, b) => (a.name > b.name ? 1 : -1))

  const candidateActions = {
    add: id => {
      const candidateList = [
        ...selectedContest.candidates.filter(item => item !== id)
      ]
      candidateList.push(id)
      setSelectedContest({
        ...selectedContest,
        candidates: candidateList
      })
    },
    remove: id => {
      const newList = selectedContest.candidates.filter(item => item !== id)
      setSelectedContest({
        ...selectedContest,
        candidates: newList
      })
    }
  }

  const toggleCandidate = id => {
    if (selectedContest.candidates.includes(id)) {
      candidateActions.remove(id)
    } else {
      candidateActions.add(id)
    }
  }

  const [searchResults, setSearchResults] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  useEffect(() => {
    if (selectedCandidate) {
      const result = props.candidates.filter(item => item._id === selectedCandidate._id)[0]
      if (result) {
        setSelectedCandidate(result)
      }
    }
  }, [props.candidates])

  const [activeTab, setActiveTab] = useState('details')

  return (
    <div>
      <Row className={styles.parentRow}>
        <Col size='4'>
          <Row>
            <h4>Select and Assign Candidates</h4>
          </Row>
          <Row className={styles.searchField}>
            <CandidateSearch
              candidates={candidates}
              contest={selectedContest}
              setSearchResults={setSearchResults}
              actions={candidateActions}
            />
          </Row>
          <Row>
            <ul className={styles.linkedCandidateList}>
              {searchResults.map(candidate => (
                <li
                  key={candidate._id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={
                    selectedCandidate && candidate._id === selectedCandidate._id
                      ? styles.listItemActive
                      : ''
                  }
                >
                  <span>{candidate.name}</span>
                  <input
                    type='checkbox'
                    checked={selectedContest.candidates.includes(candidate._id)}
                    onChange={() => toggleCandidate(candidate._id)}
                  />
                </li>
              ))}
            </ul>
          </Row>
        </Col>
        <Col size='8'>
          <Row>
            <Nav className={styles.navContainer} tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 'details' })}
                  onClick={() => {
                    setActiveTab('details')
                  }}
                >
                  <span>Details</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 'positions' })}
                  onClick={() => {
                    setActiveTab('positions')
                  }}
                >
                  <span>Positions</span>
                </NavLink>
              </NavItem>

              <TabContent style={{ width: '100%' }} activeTab={activeTab}>
                <TabPane tabId='details'>
                  <CandidateEditForm
                    contest={selectedContest}
                    selectedCandidate={selectedCandidate}
                  />
                </TabPane>
                <TabPane tabId='positions'>
                  <PositionEditForm
                    selectedContest={selectedContest}
                    selectedCandidate={selectedCandidate}
                  />
                </TabPane>
              </TabContent>
            </Nav>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  candidates: state.candidates.candidates
})

export default connect(
  mapStateToProps,
  {}
)(ContestCandidateEditor)
