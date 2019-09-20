import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import {getContests, updateContest, addContest, deleteContest} from '../../actions/contestActions';
import {getCandidates} from '../../actions/candidateActions';
import {getIssues} from '../../actions/issueActions';

import styles from './css/ContestEditor.module.css';

import ContestDetailEditor from './ContestDetailEditor';
import ContestCandidateEditor from './ContestCandidateEditor';
import ContestIssueEditor from './ContestIssueEditor';
import ContestPollingEditor from './ContestPollingEditor';

const ContestEditor = (props) => {

    useEffect(()=>{
        props.getCandidates();
        props.getContests();
        props.getIssues();
    },[])

    const [isDropdownOpen, toggleDropdown] = useState(false);

    const [selectedContest, setSelectedContest] = useState(props.contest);
    const [persistantName, setPersistantName] = useState(props.contest ? props.contest.name : null);

    useEffect(() => {
        if(props.contest){
            setSelectedContest(props.contest)
            setPersistantName(props.contest.name)
        }
    }, [props.contest])

    const detailEventHandlers = {
        onNameChange: (event) => {
            event.persist();
            setSelectedContest({
                ...selectedContest,
                name: event.target.value,
            })
        },
        onDescriptionChange: (event) => {
            event.persist();
            setSelectedContest({
                ...selectedContest,
                description: event.target.value,
            })
        },
        onCountryChange: (event) => {
            event.persist();
            setSelectedContest({
                ...selectedContest,
                country: event.target.value,
            })
        },
        onUrlChange: (event) => {
            event.persist();
            setSelectedContest({
                ...selectedContest,
                url: event.target.value,
            })
        },
        toggleDefaultStatus:  () => {
            if(!selectedContest.default){
                setSelectedContest({
                    ...selectedContest,
                    default: true,
                })
            } else {
                setSelectedContest({
                    ...selectedContest,
                    default: false,
                })
            }
        }
    }

    const saveContest = () => {

        if(selectedContest._id){
            props.updateContest(selectedContest);
        } else {
            props.addContest(selectedContest);
        }
    }

    const deleteContest = () => {
        if(selectedContest._id){
            const namePrompt = window.prompt(`Are you sure that you want to delete this contest? If you are sure, type \`${selectedContest.name.trim()}\` `);
            if (namePrompt && namePrompt.trim() === selectedContest.name.trim()) {
                props.deleteContest(selectedContest);
            }
        } else {
            setSelectedContest(null);
        }
    }

    const getCandidateById = (id) => {
        const result = props.candidates.filter(item => item._id === id)[0];
        return (result) ? result : {unknown: true};
    }

    return (
        <div className={styles.container}>
            
            <h1>Contest Editor</h1>
            
            <h3 className={styles.selectedContestTitle}>
                {persistantName ? persistantName: 'No Contest Selected'}
            </h3>

            <ContestDetailEditor 
                selectedContest={selectedContest} 
                eventHandlers={detailEventHandlers} />

            <br />

            <h4>Candidates</h4>
            <ContestCandidateEditor 
                styles={styles} 
                candidates={props.candidates}
                selectedContest={selectedContest}
                setSelectedContest={setSelectedContest} />
            <hr />

            <h4>Issues</h4>
            <ContestIssueEditor
                styles={styles}
                issues={props.issues}
                selectedContest={selectedContest}
                setSelectedContest={setSelectedContest} />
            <hr />

            <h4>Polling</h4>
            <ContestPollingEditor
                styles={styles}
                selectedContest={selectedContest}
                setSelectedContest={setSelectedContest}
                getCandidateById={getCandidateById} />
            <hr/>
            
            <div className={styles.buttonRow}>
                <Button color="danger" onClick={deleteContest} disabled={!selectedContest}>Delete</Button>                    
                <Button color="primary" onClick={saveContest} disabled={!selectedContest}>Save</Button>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    contests: state.contests,
    candidates: state.candidates.candidates,
    issues: state.issues.issues,
})

export default connect(mapStateToProps, {getContests, updateContest, addContest, getCandidates, getIssues, deleteContest})(ContestEditor);
