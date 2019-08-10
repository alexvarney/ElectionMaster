import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Button} from 'reactstrap';


import styles from './css/PollingEditor.module.css';
import {updateCandidate, getCandidates} from '../actions/candidateActions';

class PollingEditor extends Component {
    constructor(){
        super();

        this.state = {
            newValues: {},
        }
    }

    componentDidMount(){
        this.props.getCandidates();
    }

    handlePollingUpdate = (event) => {
        event.persist();
        
        this.setState((prevState) => ({
            newValues: {
                ...prevState.newValues,
                [event.target.name]: {
                    polling: event.target.value,
                    _id: event.target.name,
                }
            }
        }))

    }

    handlePollingSubmit = (event) => {
        event.preventDefault();

        for (var updatedValue in this.state.newValues){
            const item = this.state.newValues[updatedValue];
            this.props.updateCandidate(item);
        }
    }

    render() {
        
        if (!this.props.candidates){
            return null;
        }

        if(!this.props.user.token){
            return <p>You must be logged in to view this page.</p>
        }

        return (
            <div className={styles.container}>
                <form>
                    <table className={styles.pollingTable}>
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Polling</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.candidates.sort((a, b)=> (a.polling < b.polling)?1:-1).map((candidate)=>
                                <tr key={candidate._id}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.polling}</td>
                                    <td>
                                        <input 
                                            name={candidate._id} 
                                            onChange={this.handlePollingUpdate} 
                                            value={(this.state.newValues[candidate._id]) ? this.state.newValues[candidate._id].polling : candidate.polling
                                    }></input></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Button onClick={this.handlePollingSubmit}>Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    candidates: state.candidates.candidates,
    user: state.user,
})

export default connect(mapStateToProps, {updateCandidate, getCandidates})(PollingEditor);