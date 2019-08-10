import React, { Component } from 'react';
import {connect} from 'react-redux';

import {login, logout, auth} from '../actions/userActions';

import styles from './css/Login.module.css';

import {Button} from 'reactstrap';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            formValues: {},
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
        this.props.login(this.state.formValues);
    }

    onLogoutClick = () => {
        this.props.logout(this.props.user.token);
    }

    render() {

        if(this.props.user.token !== "") {
            return( 
                <p className={styles.loginText}> Welcome back, {this.props.user.user.name} <Button color="link" onClick={this.onLogoutClick}>(Sign out)</Button></p>
            )
        }

        return (
            <form onSubmit={this.onFormSubmit} onChange={this.onFormChange} className={styles.form}>
                <div className={styles.formItem}>
                    <label>Email:</label>
                    <input name="email" value={this.state.formValues['email']} type="text" />
                </div>
                <div className={styles.formItem}>
                    <label>Password:</label>
                    <input name="password" value={this.state.formValues['password']} type="password" />
                </div>
                <Button size="sm" onClick={this.onFormSubmit}>Login</Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {login, logout, auth})(Login)