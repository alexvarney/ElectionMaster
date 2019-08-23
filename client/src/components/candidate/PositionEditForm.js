import React, { Component } from 'react';

import {updateCandidate} from '../../actions/candidateActions';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './css/PositionEditForm.module.css';


class PositionEditForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            candidate: {},
            selectedIssueId: '',
            position: {},
            selectedFilter: 'Complete',
            statusDropdownOpen: false,
        }
    }

    componentDidMount = () => {

        const candidate = this.props.candidates.candidates ?this.props.candidates.candidates.filter((item)=>item._id === this.props.candidates.selectedCandidateId)[0]:null;

        if(!candidate) return null;

        this.setState({
            candidate: candidate,
        });

    }

    handleFormChange = (event) => {
        event.persist();
        console.log(event.target.name);
        this.setState((prevState) => ({
            formValues: {
                ...prevState.formValues,
                [event.target.name]: event.target.value,
            }
        }))
    }

    getPositionName = (position) => {
        const issue = this.props.issues.issues.filter(i => i._id === position.issue)[0]

        if (issue){
            return issue.name;
        }

        return ('Unknown Issue');
    }

    submitForm = (event) => {
        event.preventDefault();

        const positions = this.state.candidate.positions.filter(position=>position._id !== this.state.position._id);

        const updatedCandidate = {
            ...this.state.candidate,
            positions: [
                this.state.position,
                ...positions,
            ]
        }

        this.props.updateCandidate(updatedCandidate);


    }

    getButton = (name) => {
        if (this.state.selectedFilter === name){
            return <Button color="primary" name={name} outline>{name}</Button>
        }

        return <Button color="primary" onClick={()=>this.setState({selectedFilter: name})} name={name}>{name}</Button>
    }

    getIssue = (id) => {
        return this.props.issues.issues.filter(item=>item._id === id)[0];
    }

    getIssues = () => {
        
        const getCompletedIssues = () => {

            const getPosition = (position) => this.props.issues.issues.filter(i => i._id === position.issue)[0];
    
            if (this.state.candidate.positions){
                return this.state.candidate.positions.map(item=>getPosition(item));
            }
    
            return [];
        }


        const getUncompletedIssues = () => {

            const completedIssueIds = getCompletedIssues().map(issue => issue._id);

            return this.props.issues.issues.filter(issue => {
                return !completedIssueIds.includes(issue._id);
            })

        }


        switch(this.state.selectedFilter){

            case('All'):
                return this.props.issues.issues;
            case('Complete'):
                return getCompletedIssues();
            case('Incomplete'):
                return getUncompletedIssues();
            default:
                return this.props.issues.issues;

        }

    }

    setSelectedIssueId = (id) => {

        let position = this.state.candidate.positions.filter(position => position.issue === id)[0]

        if(!position){
            position = {
                description: '',
                issue: id,
                links: [],
                status: 'unknown',
            }
        }

        this.setState({selectedIssueId: id, position: position})
    }

    toggleSelectDropdown = () => {
        this.setState((prevState)=>({
            statusDropdownOpen: !prevState.statusDropdownOpen,
        }))
    }

    setPositionStatus = (status) => {
        this.setState((prevState)=>({
            position: {
                ...prevState.position,
                status: status,
            }
        }))
    }

    handleDescriptionChange = (event) => {
        event.persist();
        this.setState((prevState)=>({
            position: {
                ...prevState.position,
                description: event.target.value,
            }
        }))
    }

    

    render() {

        if(!this.props.user.token) {
            return(
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <h2 className={styles.subheading}>You must be logged in to view this page.</h2>
                        <Button tag={Link} to="/candidates">Close</Button>
                    </div>
                </div>
        )}

        const selectedIssue = this.getIssue(this.state.selectedIssueId);

        return (
            <div className={styles.overlay}>
                <div className={styles.container}>

                    <div className={styles.headingContainer}>
                        <h1 className={styles.title}>Edit Positions</h1>
                        {selectedIssue ? <h2 className={styles.issueHeading}>{selectedIssue.name}</h2> : null}
                    </div>
                    <div className={styles.colContainer}>
                        <div className={styles.positionColumn}>

                            <h2 className={styles.subheading}>Positions</h2>

                            <div className={styles.filterButtons}>
                                <ButtonGroup block>
                                    {this.getButton('All')}
                                    {this.getButton('Complete')}
                                    {this.getButton('Incomplete')}
                                </ButtonGroup>
                            </div>

                            <div className={styles.positionSelectorBorder}>
                                <div className={styles.positionSelectorContainer}>
                                    {this.getIssues() ? this.getIssues().map(issue=>
                                        <div key={issue._id} onClick={()=>this.setSelectedIssueId(issue._id)} className={styles.positionSelector}>
                                            <h3>{issue.name} </h3>
                                        </div>
                                        ) : null}
                                </div>
                            </div>
                        </div>
                        
                        {selectedIssue ?
                        <div className={styles.positionColumn}>

                                <form className={styles.positionForm}>
                                    <h2 className={styles.subheading}>Status</h2>
                                    
                                    <div className={styles.dropdown}>
                                        <Dropdown color="primary" isOpen={this.state.statusDropdownOpen} toggle={this.toggleSelectDropdown}>
                                            <DropdownToggle color="primary" outline block caret>
                                                {this.state.position.status.charAt(0).toUpperCase() + this.state.position.status.slice(1)}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={()=>this.setPositionStatus('supports')}>Supports</DropdownItem>
                                                <DropdownItem onClick={()=>this.setPositionStatus('mixed')}>Mixed</DropdownItem>
                                                <DropdownItem onClick={()=>this.setPositionStatus('opposed')}>Opposed</DropdownItem>
                                                <DropdownItem onClick={()=>this.setPositionStatus('unknown')}>Unknown</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>

                                    <h2 className={styles.subheading}>Description</h2>
                                    
                                    <div className={styles.textAreaContainer}>
                                        <textarea className={styles.descriptionEditor} type="text" name="description" value={this.state.position.description || ''} onChange={this.handleDescriptionChange} />
                                    </div>
                                    
                                    <ol className={styles.links}>
                                        {this.state.position.links ? this.state.position.links.map(item=>{
                                            return (<li>{item.title}</li>)
                                        }):null}
                                    </ol>
                                </form>
                            </div> 
                        : null}

                    </div>

                    <div className={styles.controlButtons}>
                        <Button color="info" className={styles.formButton} onClick={this.submitForm} type="submit">Submit</Button>
                        <Button color="danger" className={styles.formButton} tag={Link} to="/candidates">Close</Button>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
    issues: state.issues,
    user: state.user,
})

export default connect(mapStateToProps, {updateCandidate})(PositionEditForm);