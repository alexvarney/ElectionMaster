import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './css/IssueEditForm.module.css';
import {Button} from 'reactstrap';
import {Scrollbars} from 'react-custom-scrollbars';
import {createIssue, updateIssue} from '../../actions/issueActions';

export class IssueEditForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedIssue: {},
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
        }
        this.setSelectedIssue(newIssue);
    }

    saveIssue = () => {
        if (this.state.selectedIssue._id){
            this.props.updateIssue(this.state.selectedIssue);
        } else {
            this.props.createIssue(this.state.selectedIssue);
        }

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
                                    {this.props.issues.issues.map(issue=>(
                                        <div key={issue._id} onClick={()=>this.setSelectedIssue(issue)} className={styles.issueSelector}>{issue.name}</div>
                                    ))}
                                </Scrollbars>
                            </div>
                        </div>
                        <div className={styles.editContainer}>
                            <h2 className={styles.subheading}>Name</h2>
                            <input className={styles.nameEditor} onChange={this.editIssue} type="text" name="name" value={this.state.selectedIssue.name}></input>
                            <h2 className={styles.subheading}>Description</h2>
                            <textarea className={styles.descriptionEditor} onChange={this.editIssue} name="description" value={this.state.selectedIssue.description}/>
                        </div>
                    </div>

                    <div className={styles.controlButtons}>

                        <Button onClick={this.saveIssue}>Save</Button>
                        <Button tag={Link} to="/issues">Close</Button>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issues: state.issues,
    user: state.user,
})

export default connect(mapStateToProps, {createIssue, updateIssue})(IssueEditForm)
