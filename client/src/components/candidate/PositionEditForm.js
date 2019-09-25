import React, { Component } from "react";

import { updateCandidate } from "../../actions/candidateActions";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import styles from "./css/PositionEditForm.module.css";

class PositionEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidate: {},
      selectedIssueId: "",
      position: {},
      selectedFilter: "Complete",
      statusDropdownOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCandidate !== this.props.selectedCandidate) {
      this.setState({ candidate: this.props.selectedCandidate });
    } else if (prevProps.selectedCandidate && this.props.selectedCandidate){
      if (prevProps.selectedCandidate.positions !== this.props.selectedCandidate.positions) {
        this.setState({candidate: this.props.selectedCandidate})
      }
    }

  }

  componentDidMount = () => {
    const candidate = this.props.selectedCandidate;

    if (!candidate) return null;

    this.setState({
      candidate: candidate
    });
  };

  handleFormChange = event => {
    event.persist();
    console.log(event.target.name);
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [event.target.name]: event.target.value
      }
    }));
  };

  getPositionName = position => {
    const issue = this.props.issues.issues.filter(
      i => i._id === position.issue
    )[0];

    if (issue) {
      return issue.name;
    }

    return "Unknown Issue";
  };

  submitForm = event => {
    event.preventDefault();

    const positions = this.state.candidate.positions.filter(
      position => position._id !== this.state.position._id
    );

    const updatedCandidate = {
      ...this.state.candidate,
      positions: [this.state.position, ...positions]
    };

    this.props.updateCandidate(updatedCandidate);
  };

  getButton = name => {
    if (this.state.selectedFilter === name) {
      return (
        <Button color="primary" name={name} outline>
          {name}
        </Button>
      );
    }

    return (
      <Button
        color="primary"
        onClick={() => this.setState({ selectedFilter: name })}
        name={name}
      >
        {name}
      </Button>
    );
  };

  getIssue = id => {
    return this.props.issues.issues.filter(item => item._id === id)[0];
  };

  getIssues = () => {
    const selectedContest = this.props.selectedContest;

    const filteredIssues = selectedContest
      ? this.props.issues.issues.filter(issue =>
          selectedContest.issues.includes(issue._id)
        )
      : [];

    const sortedIssues = filteredIssues.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );

    const getCompletedIssues = () => {
      const getPosition = position =>
        sortedIssues.filter(i => i._id === position.issue)[0];

      if (this.state.candidate.positions) {
        return this.state.candidate.positions
          .map(item => {
            const position = getPosition(item);
            return position && position._id ? position : {};
          })
          .filter(item => item && item._id);
      }

      return [];
    };

    const getUncompletedIssues = () => {
      const completedIssueIds = getCompletedIssues().map(issue => issue._id);

      return sortedIssues.filter(issue => {
        return !completedIssueIds.includes(issue._id);
      });
    };

    switch (this.state.selectedFilter) {
      case "All":
        return sortedIssues;
      case "Complete":
        return getCompletedIssues();
      case "Incomplete":
        return getUncompletedIssues();
      default:
        return sortedIssues;
    }
  };

  setSelectedIssueId = id => {
    let position = this.state.candidate.positions.filter(
      position => position.issue === id
    )[0];

    if (!position) {
      position = {
        description: "",
        issue: id,
        links: [],
        status: "unknown"
      };
    }

    this.setState({ selectedIssueId: id, position: position });
  };

  toggleSelectDropdown = () => {
    this.setState(prevState => ({
      statusDropdownOpen: !prevState.statusDropdownOpen
    }));
  };

  setPositionStatus = status => {
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        status: status
      }
    }));
  };

  handleDescriptionChange = event => {
    event.persist();
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        description: event.target.value
      }
    }));
  };

  render() {
    if (!this.props.user.token) {
      return (
        <div className={styles.container}>
          <h2 className={styles.subheading}>
            You must be logged in to view this page.
          </h2>
          <Button tag={Link} to="/candidates">
            Close
          </Button>
        </div>
      );
    }

    if (!this.props.selectedCandidate) {
      return <h3>You must select a candidate.</h3>;
    }

    const selectedIssue = this.getIssue(this.state.selectedIssueId);

    return (
      <div className={styles.container}>
        <div className={styles.positionSelectorBorder}>
          <div className={styles.positionSelectorContainer}>
            {this.getIssues()
              ? this.getIssues().map(issue => (
                  <div
                    key={issue._id}
                    onClick={() => this.setSelectedIssueId(issue._id)}
                    className={
                      issue._id === this.state.selectedIssueId
                        ? styles.positionSelector_active
                        : styles.positionSelector
                    }
                  >
                    <h3>{issue.name} </h3>
                  </div>
                ))
              : null}
          </div>
          <ButtonGroup className={styles.filterButtons} block="true">
            {this.getButton("All")}
            {this.getButton("Complete")}
            {this.getButton("Incomplete")}
          </ButtonGroup>
        </div>

        {selectedIssue ? (
          <div className={styles.positionColumn}>
            <form className={styles.positionForm}>
              <h2 className={styles.subheading}>Status</h2>

              <div className={styles.dropdown}>
                <Dropdown
                  color="primary"
                  isOpen={this.state.statusDropdownOpen}
                  toggle={this.toggleSelectDropdown}
                >
                  <DropdownToggle color="primary" outline block caret>
                    {this.state.position.status.charAt(0).toUpperCase() +
                      this.state.position.status.slice(1)}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => this.setPositionStatus("supports")}
                    >
                      Supports
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => this.setPositionStatus("mixed")}
                    >
                      Mixed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => this.setPositionStatus("opposed")}
                    >
                      Opposed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => this.setPositionStatus("unknown")}
                    >
                      Unknown
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <h2 className={styles.subheading}>Description</h2>

              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.descriptionEditor}
                  type="text"
                  name="description"
                  value={this.state.position.description || ""}
                  onChange={this.handleDescriptionChange}
                />
              </div>
            </form>
          </div>
        ) : null}

        <div className={styles.controlButtons}>
          <Button
            color="primary"
            className={styles.formButton}
            onClick={this.submitForm}
            type="submit"
          >
            Save Position
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates,
  issues: state.issues,
  user: state.user,
  contests: state.contests
});

export default connect(
  mapStateToProps,
  { updateCandidate }
)(PositionEditForm);
