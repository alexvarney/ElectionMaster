import React, { useState, useEffect } from 'react';

import { updateCandidate } from '../../actions/candidateActions';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import styles from './css/PositionEditForm.module.css';

const PositionEditForm = props => {
  const {
    user,
    issues,
    selectedContest,
    selectedCandidate,
    updateCandidate
  } = props

  const POSITION_STATUS = {
    SUPPORTS: 'supports',
    MIXED: 'mixed',
    OPPOSED: 'opposed',
    UNKNOWN: 'unknown'
  }

  const [selectedPosition, setSelectedPosition] = useState(null)

  const getIssues = () => {
    if (!issues) return []

    // Get the issues that are assigned to the selected contest
    const contestIssues = issues
      .filter(issue => selectedContest.issues.includes(issue._id))
      .sort((a, b) => (a.name > b.name ? 1 : -1))

    // Create list of Issue ID's for candidate's completed positions
    const completedIssues = selectedCandidate
      ? selectedCandidate.positions.map(position => position.issue)
      : []

    switch (selectedFilter) {
      case FILTERS.incomplete:
        return contestIssues.filter(
          issue => !completedIssues.includes(issue._id)
        )
      case FILTERS.completed:
        return contestIssues.filter(issue =>
          completedIssues.includes(issue._id)
        )
      case FILTERS.all:
      default:
        return contestIssues
    }
  }

  const getIssueById = id => {
    return issues ? issues.filter(item => item._id === id)[0] : null
  };

  const getCandidatePositionByIssueId = id => {
    // check if candidate has a position on this issue or create a new object with defaults
    return (
      selectedCandidate.positions.filter(item => item.issue === id)[0] || {
        issue: id,
        status: POSITION_STATUS.UNKNOWN
      }
    )
  };

  const setSelectedIssue = issue => {
    setSelectedPosition(getCandidatePositionByIssueId(issue._id))
  };

  const updatePosition = event => {
    event.persist()

    setSelectedPosition({
      ...selectedPosition,
      [event.target.name]: event.target.value
    })
  };

  const setPositionStatus = status => {
    setSelectedPosition({
      ...selectedPosition,
      status
    })
  };

  const FILTERS = {
    all: 'All',
    completed: 'Complete',
    incomplete: 'Incomplete'
  }

  const [selectedFilter, setSelectedFilter] = useState(FILTERS.all)

  const getFilterButtons = () => {
    return (
      <>
        <Button
          color='primary'
          onClick={() => setSelectedFilter(FILTERS.all)}
          name={FILTERS.all}
          outline={selectedFilter === FILTERS.all}
        >
          {FILTERS.all}
        </Button>
        <Button
          color='primary'
          onClick={() => setSelectedFilter(FILTERS.completed)}
          name={FILTERS.completed}
          outline={selectedFilter === FILTERS.completed}
        >
          {FILTERS.completed}
        </Button>
        <Button
          color='primary'
          onClick={() => setSelectedFilter(FILTERS.incomplete)}
          name={FILTERS.incomplete}
          outline={selectedFilter === FILTERS.incomplete}
        >
          {FILTERS.incomplete}
        </Button>
      </>
    )
  };

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  const savePosition = () => {
    const filteredPositions = selectedCandidate.positions.filter(
      item => item.issue !== selectedPosition.issue
    )

    const updatedCandidate = {
      ...selectedCandidate,
      positions: [selectedPosition, ...filteredPositions]
    }
    updateCandidate(updatedCandidate)
  };

  const deletePosition = () => {
    if (window.confirm('Are you sure?')) {
      const filteredPositions = selectedCandidate.positions.filter(
        item => item.issue !== selectedPosition.issue
      )
      const updatedCandidate = {
        ...selectedCandidate,
        positions: [...filteredPositions]
      }
      updateCandidate(updatedCandidate)
    }
  }

  const submitForm = () => savePosition()

  useEffect(() => {
    if (selectedPosition && selectedPosition.issue) {
      setSelectedPosition(
        getCandidatePositionByIssueId(selectedPosition.issue)
      )
    }
  }, [selectedCandidate])

  /* JSX Result Below */

  if (!user.token) {
    return (
      <div className={styles.container}>
        <h2 className={styles.subheading}>
          You must be logged in to view this page.
        </h2>
        <Button tag={Link} to='/candidates'>
          Close
        </Button>
      </div>
    )
  }

  if (!selectedCandidate) {
    return <h3>You must select a candidate.</h3>
  }

  return (
    <div className={styles.container}>
      <div className={styles.positionSelectorBorder}>
        <div className={styles.positionSelectorContainer}>
          {getIssues()
            ? getIssues().map(issue => (
              <div
                key={issue._id}
                onClick={() => setSelectedIssue(issue)}
                className={
                  issue &&
                    selectedPosition &&
                    issue._id === selectedPosition.issue
                    ? styles.positionSelector_active
                    : styles.positionSelector
                }
              >
                <h3>{issue.name} </h3>
              </div>
            ))
            : null}
        </div>
        <ButtonGroup className={styles.filterButtons} block='true'>
          {getFilterButtons()}
        </ButtonGroup>
      </div>

      {selectedPosition ? (
        <>
          <div className={styles.positionColumn}>
            <form className={styles.positionForm}>
              <h4 className={styles.subheading}>
                {getIssueById(selectedPosition.issue).name}
              </h4>

              <div className={styles.dropdown}>
                <Dropdown
                  color='primary'
                  isOpen={statusDropdownOpen}
                  toggle={() => {
                    setStatusDropdownOpen(!statusDropdownOpen)
                  }}
                >
                  <DropdownToggle
                    color='primary'
                    outline
                    block
                    caret
                    disabled={!selectedPosition}
                  >
                    {selectedPosition.status.charAt(0).toUpperCase() +
                      selectedPosition.status.slice(1) || 'Unknown'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() =>
                        setPositionStatus(POSITION_STATUS.SUPPORTS)}
                    >
                      Supports
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setPositionStatus(POSITION_STATUS.MIXED)}
                    >
                      Mixed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setPositionStatus(POSITION_STATUS.OPPOSED)}
                    >
                      Opposed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setPositionStatus(POSITION_STATUS.UNKNOWN)}
                    >
                      Unknown
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.descriptionEditor}
                  type='text'
                  name='description'
                  value={selectedPosition.description || ''}
                  onChange={updatePosition}
                />
              </div>
            </form>
          </div>

          <div className={styles.controlButtons}>
            <Button
              color='danger'
              className={styles.formButton}
              onClick={deletePosition}
            >
              Delete Position
            </Button>
            <Button
              color='primary'
              className={styles.formButton}
              onClick={submitForm}
              type='submit'
            >
              Save Position
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
};

const mapStateToProps = state => ({
  issues: state.issues.issues,
  user: state.user
})

export default connect(
  mapStateToProps,
  { updateCandidate }
)(PositionEditForm)
