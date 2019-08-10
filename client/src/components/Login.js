import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {login, logout, auth} from '../actions/userActions';

import styles from './css/Login.module.css';

import {Button, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            formValues: {
                email: '',
                password: '',
            },
            dropdownOpen: false,
        }
    }

    componentDidMount(){
        this.props.auth();
    }

    onFormChange = (event) => {
        event.persist();
        this.setState((prevState)=>({
           formValues: {
               ...prevState.formValues, 
               [event.target.name]: event.target.value} 
        }))
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({dropdownOpen: false});
        this.props.login(this.state.formValues);
    }

    onLogoutClick = () => {
        this.setState({dropdownOpen: false});
        this.props.logout(this.props.user.token);
    }

    toggleDropdown = () => {
        this.setState((prevState)=>({
            dropdownOpen: !prevState.dropdownOpen,
        }))
    }

    render() {

        if(this.props.user.token !== "") {
            return(
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle className={styles.toggle} tag="span">
                        <i className="fas fa-user-alt"></i> {this.props.user.user.name}
                    </DropdownToggle>
                    <DropdownMenu right className={styles.dropdown}>
                        <div className={styles.dropdownContent}>
                            <Button outline color="primary" size="sm" tag={Link} to="/profile">Profile</Button>
                            <Button outline color="primary" size="sm" onClick={this.onLogoutClick}>Sign Out</Button>
                        </div>
                        <div className={styles.triangle}></div>
                    </DropdownMenu>
                </Dropdown>
            )
        }

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle className={styles.toggle} tag="span">
                    Login
                </DropdownToggle>
                <DropdownMenu className={styles.dropdown} right>
                    <form onSubmit={this.onFormSubmit} className={styles.form}>
                        <div className={styles.formItem}>
                            <label>Email:</label>
                            <input name="email" onChange={this.onFormChange} value={this.state.formValues.email} type="text" />
                        </div>
                        <div className={styles.formItem}>
                            <label>Password:</label>
                            <input name="password" onChange={this.onFormChange} value={this.state.formValues.password} type="password" />
                        </div>
                        <Button outline color="primary" size="sm" onClick={this.onFormSubmit}>Login</Button>
                    </form>
                    <div className={styles.triangle}></div>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {login, logout, auth})(Login)