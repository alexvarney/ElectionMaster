import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './css/IssueEditForm.module.css';
import {Button, Input, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';
import {Scrollbars} from 'react-custom-scrollbars';
import {createIssue, updateIssue, createIssueAndAssign, deleteIssue} from '../../actions/issueActions';
import countries from 'iso-3166-country-list';

export class IssueEditForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedIssue: props.selectedIssue ? props.selectedIssue : {},
        }
    }

    setSelectedIssue = (issue) => {
        this.setState({selectedIssue: issue});
    }

    editIssue = (event) => {
        event.persist();
        this.setState(prevState=>({
            selectedIssue: {
                ...prevState.selectedIssue,
                [event.target.name]: event.target.value,
            }
        }))
    }

    createNewIssue = () => {
        const newIssue = {
            name: 'New issue',
            description: '',
            country: 'US',
        }
        this.setSelectedIssue(newIssue);
    }

    saveIssue = () => {
        if (this.state.selectedIssue._id){
            this.props.updateIssue(this.state.selectedIssue);
        } else {

            const selectedContest = this.getSelectedContest();

            if(!selectedContest){
                this.props.createIssue(this.state.selectedIssue);
            } else {
                this.props.createIssueAndAssign(this.state.selectedIssue, selectedContest);
            }
        }
    }

    getSelectedContest = () => {
        return this.props.contests.contests.filter(contest=>contest._id === this.props.contests.selectedContestId)[0];
    }

    getContestIssues = () => {
        const selectedContest = this.getSelectedContest();
        const filteredIssues = selectedContest ? this.props.issues.issues.filter(issue=> selectedContest.issues.includes(issue._id)) : [];
        const sortedIssues = filteredIssues.sort((a, b)=>(a.name > b.name ? 1 : -1));
        return sortedIssues;
    }

    handleDelete = (event) => {
        if(window.confirm('Are you sure you want to delete this candidate?')){
            this.props.deleteIssue({...this.state.selectedIssue});
        }
    }

    getCountryName = () => {
        if(this.state.selectedIssue.country){
            return countries.name(this.state.selectedIssue.country.toString());
        }

        return '';
    }


    render() {

        if(!this.props.user.token) {
            return(
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <h2 className={styles.subheading}>You must be logged in to view this page.</h2>
                        <Button tag={Link} to="/issues">Close</Button>
                    </div>
                </div>
        )}

        return (
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <h1>Issue Editor</h1>
                    <div className={styles.row}>
                        <div className={styles.selectContainer}>
                            <h2 className={styles.subheading}>Issue</h2>
                            <div className={styles.issueSelectContainer}>
                                <Scrollbars style={{borderRadius: '10px'}}>
                                    <div className={styles.issueSelector} onClick={this.createNewIssue}><span><i className="fas fa-plus-circle"></i> New Issue</span></div>
                                    {this.getContestIssues().map(issue=>(
                                        <div key={issue._id} onClick={()=>this.setSelectedIssue(issue)} className={styles.issueSelector}>{issue.name}</div>
                                    ))}
                                </Scrollbars>
                            </div>
                        </div>
                        <div className={styles.editContainer}>
                        <h2 className={styles.subheading}>Edit</h2>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Name</InputGroupText>
                                </InputGroupAddon>
                                <Input className={''} onChange={this.editIssue} type="text" name="name" value={this.state.selectedIssue.name || ''}></Input>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Country</InputGroupText>
                                </InputGroupAddon>
                                <Input className={''} onChange={this.editIssue} type="text" name="country" value={this.state.selectedIssue.country || ''}></Input>
                                <InputGroupAddon addonType="append">
                                <InputGroupText>{this.getCountryName()}</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            
                            
                            <textarea className={styles.descriptionEditor} onChange={this.editIssue} name="description" value={this.state.selectedIssue.description}/>
                        </div>
                    </div>

                    <div className={styles.controlButtons}>
                        
                        <Button disabled={(this.state.selectedIssue._id) ? false: true} color="danger" onClick={()=>this.handleDelete()}>Delete</Button>           
                        <Button color="primary" onClick={this.saveIssue}>Save</Button>
                        <Button onClick={()=>this.props.history.goBack()}>Close</Button>
         
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issues: state.issues,
    user: state.user,
    contests: state.contests,
})

export default connect(mapStateToProps, {createIssue, updateIssue, createIssueAndAssign, deleteIssue})(IssueEditForm)
