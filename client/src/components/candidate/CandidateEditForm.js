import React, { Component } from 'react';
import {updateCandidate, createCandidate, deleteCandidate} from '../../actions/candidateActions';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import styles from './css/CandidateEditForm.module.css';
import {Button, InputGroup, InputGroupAddon, Input, InputGroupText} from 'reactstrap';
import countries from 'iso-3166-country-list';
import moment from 'moment';

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

    handleDelete = (event) => {
        if(window.confirm('Are you sure you want to delete this candidate?')){
            this.props.deleteCandidate({...this.state.formValues});
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
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Name</InputGroupText></InputGroupAddon>
                                <Input type="text" name="name" value={this.state.formValues['name'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>State</InputGroupText></InputGroupAddon>
                                <Input type="text" name="state" value={this.state.formValues['state'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Birthdate</InputGroupText></InputGroupAddon>
                                <Input type="date" name="dob" value={moment(this.state.formValues['dob']).format('YYYY-MM-DD')|| ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Slogan</InputGroupText></InputGroupAddon>
                                <Input type="text" name="slogan" value={this.state.formValues['slogan'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                
                                <InputGroupAddon addonType="prepend"><InputGroupText>Country Code</InputGroupText></InputGroupAddon>
                                <Input type="text" name="country"  value={this.state.formValues['country'] || ''} onChange={this.handleFormChange}></Input>
                                <InputGroupAddon addonType="append">
                                {countries.name(this.state.formValues['country'] ? this.state.formValues['country'] : '' )}
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Affiliation</InputGroupText></InputGroupAddon>
                                <Input type="text" name="partyAffiliation"  value={this.state.formValues['partyAffiliation'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Website URL</InputGroupText></InputGroupAddon>
                                <Input type="text" name="website" value={this.state.formValues['website'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Website Name</InputGroupText></InputGroupAddon>
                                <Input type="text" name="websiteDisplay" value={this.state.formValues['websiteDisplay'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Image Name</InputGroupText></InputGroupAddon>
                                <Input type="text" name="image" value={this.state.formValues['image'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Status</InputGroupText></InputGroupAddon>
                                <Input type="text" name="status" value={this.state.formValues['status'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                            <InputGroup className={styles.formItem}>
                                <InputGroupAddon addonType="prepend"><InputGroupText>Net Worth</InputGroupText></InputGroupAddon>
                                <Input type="text" name="netWorth" value={this.state.formValues['netWorth'] || ''} onChange={this.handleFormChange}></Input>
                            </InputGroup>
                        </div>
                        <div className={styles.formAbout}>
                            <label>About Candidate</label>
                            <textarea type="text" name="description" value={this.state.formValues['description'] || ''} onChange={this.handleFormChange}></textarea>
                        </div>
                    </form>
                    <Button disabled={this.props.createNew && this.state.hasSaved} color="primary" className={styles.formButton} onClick={this.submitForm} type="submit">{this.props.createNew && this.state.hasSaved ? 'Saved' : 'Save'}</Button>
                    <Button className={styles.formButton} tag={Link} to={`/candidates/${this.state.formValues._id}`}>Close</Button>
                    <Button disabled={this.props.createNew} color="danger" onClick={()=>this.handleDelete()}>Delete</Button>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates,
    user: state.user,
})

export default withRouter(connect(mapStateToProps, {updateCandidate, createCandidate, deleteCandidate})(CandidateEditForm));