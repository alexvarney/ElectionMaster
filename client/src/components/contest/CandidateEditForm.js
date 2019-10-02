import React, { Component } from "react";
import {
  updateCandidate,
  createCandidate,
  deleteCandidate,
  createCandidateAndAssign
} from "../../actions/candidateActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./css/CandidateEditForm.module.css";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from "reactstrap";
import countries from "iso-3166-country-list";
import moment from "moment";

class CandidateEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      createNew: false,
      hasSaved: false
    };
  }

  componentDidMount() {
    if (this.props.selectedCandidate) {
      this.setState({
        formValues: { ...this.props.selectedCandidate }
      });
    } else {
      this.setState({
        createNew: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.selectedCandidate && this.props.selectedCandidate) {
      this.setState({
        formValues: { ...this.props.selectedCandidate }
      });
      this.setState({ createNew: false });
    } else if (
      this.props.selectedCandidate &&
      this.props.selectedCandidate !== prevProps.selectedCandidate
    ) {
      this.setState({
        formValues: { ...this.props.selectedCandidate }
      });
      this.setState({ createNew: false });
    }
  }

  createNew = () => {
    this.setState({ createNew: true, formValues: {}, hasSaved: false });
  };

  handleFormChange = event => {
    event.persist();
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [event.target.name]: event.target.value
      }
    }));
  };

  handlePrimaryColorChange = event => {
    event.persist();

    const updateColor = () => {
      this.setState(prevState=>({
        formValues: {
          ...prevState.formValues,
          colors: [...prevState.formValues.colors.filter(item => item.name !== 'primary'), {
            name: 'primary',
            value: event.target.value
          }]
        }
      }))
    }

    if(!this.state.formValues.colors){
      this.setState(prevState=>({
        formValues: {
          ...prevState.formValues,
          colors: [],
        }
      }), updateColor)
    } else {
      updateColor()
    }

    
  }

  getPrimaryColorValue = () => {
    //This is really hacky
    try{
      return this.state.formValues.colors.filter(item => item.name ==='primary')[0].value || ''
    } catch {
      return ''
    }
  }

  submitForm = event => {
    event.preventDefault();

    this.setState({ hasSaved: true });

    if (this.state.createNew) {
      if (this.props.contest) {
        this.props.createCandidateAndAssign(
          this.state.formValues,
          this.props.contest
        );
      } else {
        this.props.createCandidate(this.state.formValues);
      }
    } else {
      this.props.updateCandidate(this.state.formValues);
    }
  };

  handleDelete = event => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      this.props.deleteCandidate({ ...this.state.formValues });
    }
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

    return (
      <div className={styles.container}>
        <form className={styles.formRow}>
          <div className={styles.formCol}>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Name</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="name"
                value={this.state.formValues["name"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>URL Slug</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="urlSlug"
                value={this.state.formValues["urlSlug"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>State</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="state"
                value={this.state.formValues["state"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Birthdate</InputGroupText>
              </InputGroupAddon>
              <Input
                type="date"
                name="dob"
                value={
                  moment(this.state.formValues["dob"]).format("YYYY-MM-DD") ||
                  ""
                }
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Slogan</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="slogan"
                value={this.state.formValues["slogan"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Country Code</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="country"
                value={this.state.formValues["country"] || ""}
                onChange={this.handleFormChange}
              ></Input>
              <InputGroupAddon addonType="append">
                {countries.name(
                  this.state.formValues["country"]
                    ? this.state.formValues["country"]
                    : ""
                )}
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Affiliation</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="partyAffiliation"
                value={this.state.formValues["partyAffiliation"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Website URL</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="website"
                value={this.state.formValues["website"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Website Name</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="websiteDisplay"
                value={this.state.formValues["websiteDisplay"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Image Name</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="image"
                value={this.state.formValues["image"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Status</InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                name="status"
                value={this.state.formValues["status"] || ""}
                onChange={this.handleFormChange}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="undeclared">Undeclared</option>
              </Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Net Worth</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="netWorth"
                value={this.state.formValues["netWorth"] || ""}
                onChange={this.handleFormChange}
              ></Input>
            </InputGroup>
            <InputGroup className={styles.formItem}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Primary Color</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="netWorth"
                value={this.getPrimaryColorValue()}
                onChange={this.handlePrimaryColorChange}
              ></Input>
            </InputGroup>
            <div>
              <h5>About Candidate</h5>
              <textarea
                className={styles.aboutInput}
                type="text"
                name="description"
                value={this.state.formValues["description"] || ""}
                onChange={this.handleFormChange}
              ></textarea>
            </div>
          </div>
        </form>
        <Button
          disabled={this.state.createNew}
          color="secondary"
          className={styles.formButton}
          onClick={this.createNew}
        >
          New Candidate
        </Button>
        <Button
          disabled={this.state.createNew && this.state.hasSaved}
          color="primary"
          className={styles.formButton}
          onClick={this.submitForm}
          type="submit"
        >
          {this.props.createNew && this.state.hasSaved
            ? "Saved"
            : "Save Candidate"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates,
  user: state.user
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateCandidate,
      createCandidate,
      deleteCandidate,
      createCandidateAndAssign
    }
  )(CandidateEditForm)
);
