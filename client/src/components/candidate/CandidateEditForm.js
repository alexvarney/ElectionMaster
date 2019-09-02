import React, { Component } from 'react';
import {updateCandidate, createCandidate} from '../../actions/candidateActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './css/CandidateEditForm.module.css';
import {Button} from 'reactstrap';

class CandidateEditForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            formValues: {},
            hasSaved: false,
        }
    }

    componentDidMount = () => {

        if(!this.props.createNew){
            const candidate = this.props.candidates.candidates ? this.props.candidates.candidates.filter((item)=>item._id === this.props.candidates.selectedCandidateId)[0]:null;

            if(candidate){
                this.setState({
                    formValues: {...candidate}
                });
            }
        }

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

    submitForm = (event) => {
        event.preventDefault();

        this.setState({hasSaved: true,});

        if(!this.props.createNew){
            this.props.updateCandidate(this.state.formValues);
        } else {
            this.props.createCandidate(this.state.formValues);
        }
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

        return (
            <div className={styles.overlay}>
                <div className={styles.container}>

                    <h1>{this.props.createNew ? 'Add' : 'Edit'} Candidate</h1>
                    
                    <form className={styles.formRow}>
                        <div className={styles.formCol}>
                            <div className={styles.formItem}>
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.formValues['name'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>State</label>
                                <input type="text" name="state" value={this.state.formValues['state'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Birthdate</label>
                                <input type="text" name="dob" value={this.state.formValues['dob'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Slogan</label>
                                <input type="text" name="slogan" value={this.state.formValues['slogan'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Polling</label>
                                <input type="text" name="polling"  value={this.state.formValues['polling'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Affiliation</label>
                                <input type="text" name="partyAffiliation"  value={this.state.formValues['partyAffiliation'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Website URL</label>
                                <input type="text" name="website" value={this.state.formValues['website'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Website Name</label>
                                <input type="text" name="websiteDisplay" value={this.state.formValues['websiteDisplay'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Image Name</label>
                                <input type="text" name="image" value={this.state.formValues['image'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Status</label>
                                <input type="text" name="status" value={this.state.formValues['status'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                            <div className={styles.formItem}>
                                <label>Net Worth</label>
                                <input type="text" name="netWorth" value={this.state.formValues['netWorth'] || ''} onChange={this.handleFormChange}></input>
                            </div>
                        </div>
                        <div className={styles.formAbout}>
                            <label>About Candidate</label>
                            <textarea type="text" name="description" value={this.state.formValues['description'] || ''} onChange={this.handleFormChange}></textarea>
                        </div>
                    </form>
                    <Button disabled={this.props.createNew && this.state.hasSaved} className={styles.formButton} onClick={this.submitForm} type="submit">{this.props.createNew && this.state.hasSaved ? 'Saved' : 'Save'}</Button>
                    <Button className={styles.formButton} tag={Link} to={`/candidates/${this.state.formValues._id}`}>Close</Button>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
    user: state.user,
})

export default connect(mapStateToProps, {updateCandidate, createCandidate})(CandidateEditForm);