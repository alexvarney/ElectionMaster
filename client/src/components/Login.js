import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"

import { login, logout, auth } from "../actions/userActions"

import styles from "./css/Login.module.css"

import {
  Button,
  InputGroup,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle
} from "reactstrap"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        email: "",
        password: ""
      },
      dropdownOpen: false
    };
  }

  componentDidMount() {
    this.props.auth();
  }

  onFormChange = event => {
    event.persist();
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [event.target.name]: event.target.value
      }
    }));
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.setState({ dropdownOpen: false });
    this.props.login(this.state.formValues);
  };

  onLogoutClick = () => {
    this.setState({ dropdownOpen: false });
    this.props.logout(this.props.user.token);
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    if (this.props.user.token !== "") {
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret outline="true">
            <i className="fas fa-user-alt"></i> {this.props.user.user.name}
          </DropdownToggle>
          <DropdownMenu right className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              <Button
                outline
                color="primary"
                size="sm"
                tag={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button
                outline
                color="primary"
                size="sm"
                onClick={this.onLogoutClick}
              >
                Sign Out
              </Button>
            </div>
            <div className={styles.triangle}></div>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret outline="true">
          Login
        </DropdownToggle>
        <DropdownMenu right className={styles.dropdown}>
          <form onSubmit={this.onFormSubmit}>
            <InputGroup className={styles.loginInput}>
              <label>Email:</label>
              <input
                name="email"
                onChange={this.onFormChange}
                value={this.state.formValues.email}
                type="text"
              />
            </InputGroup>
            <InputGroup className={styles.loginInput}>
              <label>Password:</label>
              <input
                name="password"
                onChange={this.onFormChange}
                value={this.state.formValues.password}
                type="password"
              />
            </InputGroup>
            <Button
              outline
              color="primary"
              size="sm"
              onClick={this.onFormSubmit}
            >
              Login
            </Button>
          </form>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  { login, logout, auth }
)(Login)
