import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./css/IssueEditForm.module.css";
import classNames from "classnames";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Badge
} from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import {
  createIssue,
  updateIssue,
  createIssueAndAssign,
  deleteIssue
} from "../../actions/issueActions";
import countries from "iso-3166-country-list";

class IssueEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIssue: props.selectedIssue ? props.selectedIssue : null,
      tagFieldValue: ""
    };
  }

  handleTagFieldChange = event => {
    this.setState({ tagFieldValue: event.target.value });
  };

  addTag = () => {
    this.setState(prevState => ({
      selectedIssue: {
        ...prevState.selectedIssue,
        tags: [...prevState.selectedIssue.tags, prevState.tagFieldValue]
      },
      tagFieldValue: ""
    }));
  };

  removeTag = tag => {
    this.setState(prevState => ({
      selectedIssue: {
        ...prevState.selectedIssue,
        tags: [...prevState.selectedIssue.tags.filter(item => item !== tag)]
      }
    }));
  };

  setSelectedIssue = issue => {
    this.setState({ selectedIssue: issue });
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedIssue) {
      if (
        !prevProps.selectedIssue ||
        this.props.selectedIssue._id !== prevProps.selectedIssue._id
      ) {
        this.setState({ selectedIssue: this.props.selectedIssue });
      }
    }
  }

  editIssue = event => {
    event.persist();
    this.setState(prevState => ({
      selectedIssue: {
        ...prevState.selectedIssue,
        [event.target.name]: event.target.value
      }
    }));
  };

  createNewIssue = () => {
    const newIssue = {
      name: "New issue",
      description: "",
      country: "US"
    };
    this.setSelectedIssue(newIssue);
  };

  saveIssue = () => {
    if (this.state.selectedIssue._id) {
      this.props.updateIssue(this.state.selectedIssue);
    } else {
      const selectedContest = this.getSelectedContest();

      if (!selectedContest) {
        this.props.createIssue(this.state.selectedIssue);
      } else {
        this.props.createIssueAndAssign(
          this.state.selectedIssue,
          selectedContest
        );
      }
    }
  };

  getSelectedContest = () => {
    return this.props.contests.contests.filter(
      contest => contest._id === this.props.contests.selectedContestId
    )[0];
  };

  getContestIssues = () => {
    const selectedContest = this.getSelectedContest();
    const filteredIssues = selectedContest
      ? this.props.issues.issues.filter(issue =>
          selectedContest.issues.includes(issue._id)
        )
      : [];
    const sortedIssues = filteredIssues.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    return sortedIssues;
  };

  handleDelete = event => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      this.props.deleteIssue({ ...this.state.selectedIssue });
    }
  };

  getCountryName = () => {
    if (this.state.selectedIssue.country) {
      return countries.name(this.state.selectedIssue.country.toString());
    }

    return "";
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.editContainer}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Name</InputGroupText>
              </InputGroupAddon>
              <Input
                className={styles.nameEditor}
                onChange={this.editIssue}
                type="text"
                name="name"
                value={this.state.selectedIssue.name || ""}
              ></Input>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Country</InputGroupText>
              </InputGroupAddon>
              <Input
                className={styles.nameEditor}
                onChange={this.editIssue}
                type="text"
                name="country"
                value={this.state.selectedIssue.country || ""}
              ></Input>
              <InputGroupAddon addonType="append">
                <InputGroupText>{this.getCountryName()}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <Input
                onChange={this.handleTagFieldChange}
                value={this.state.tagFieldValue}
              ></Input>
              <InputGroupAddon addonType="append">
                <Button color="secondary" onClick={this.addTag}>
                  Add Tag
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <div className={styles.tags}>
              {this.state.selectedIssue.tags
                ? this.state.selectedIssue.tags.map(tag => (
                    <Badge color="primary" pill>
                      {tag}
                      <i
                        onClick={() => this.removeTag(tag)}
                        className={classNames('fas', 'fa-times',[styles.tagDeleteIcon])}
                      ></i>
                    </Badge>
                  ))
                : null}
            </div>

            <textarea
              className={styles.descriptionEditor}
              onChange={this.editIssue}
              name="description"
              value={this.state.selectedIssue.description}
            />
          </div>
        </div>

        <div className={styles.controlButtons}>
          <Button color="info" onClick={this.createNewIssue}>
            New Issue
          </Button>
          <Button
            disabled={this.state.selectedIssue._id ? false : true}
            color="danger"
            onClick={() => this.handleDelete()}
          >
            Delete
          </Button>
          <Button color="primary" onClick={this.saveIssue}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issues: state.issues,
  user: state.user,
  contests: state.contests
});

export default connect(
  mapStateToProps,
  { createIssue, updateIssue, createIssueAndAssign, deleteIssue }
)(IssueEditForm);
