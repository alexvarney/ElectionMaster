import React, { Component } from 'react';
import {updateCandidate} from '../actions/candidateActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './css/CandidateEditForm.module.css';
import {Button} from 'reactstrap';

class CandidateEditForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            formValues: {},
        }
    }

    componentDidMount = () => {

        const candidate = this.props.candidates.candidates ?this.props.candidates.candidates.filter((item)=>item._id === this.props.candidates.selectedCandidateId)[0]:null;

        if(!candidate) return null;

        this.setState({
            formValues: {...candidate}
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

    submitForm = (event) => {
        event.preventDefault();
        this.props.updateCandidate(this.state.formValues);
    }

    render() {
        return (
            <div className={styles.overlay}>
                <div className={styles.container}>

                    <h1>Edit Candidate</h1>
                    
                    <form onChange={this.handleFormChange} class={styles.formRow}>
                        <div class={styles.formCol}>
                            <div className={styles.formItem}>
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.formValues['name']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>State</label>
                                <input type="text" name="state" value={this.state.formValues['state']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Birthdate</label>
                                <input type="text" name="dob" value={this.state.formValues['dob']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Slogan</label>
                                <input type="text" name="slogan" value={this.state.formValues['slogan']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Polling</label>
                                <input type="text" name="polling"  value={this.state.formValues['polling']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Affiliation</label>
                                <input type="text" name="partyAffiliation"  value={this.state.formValues['partyAffiliation']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Website URL</label>
                                <input type="text" name="website" value={this.state.formValues['website']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Website Name</label>
                                <input type="text" name="websiteDisplay" value={this.state.formValues['websiteDisplay']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Image Name</label>
                                <input type="text" name="image" value={this.state.formValues['image']}></input>
                            </div>
                            <div class={styles.formItem}>
                                <label>Status</label>
                                <input type="text" name="status" value={this.state.formValues['status']}></input>
                            </div>
                        </div>
                        <div class={styles.formAbout}>
                            <label>About Candidate</label>
                            <textarea type="text" name="description" value={this.state.formValues['description']}></textarea>
                        </div>
                    </form>
                    <Button className={styles.formButton} onClick={this.submitForm} type="submit">Submit</Button>
                    <Button className={styles.formButton} tag={Link} to="/candidates">Close</Button>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
})

export default connect(mapStateToProps, {updateCandidate})(CandidateEditForm);