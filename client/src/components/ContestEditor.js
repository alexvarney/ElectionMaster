import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem, InputGroup, InputGroupText, InputGroupAddon, Input, Form, FormGroup, Label, Button, Col} from 'reactstrap';
import {getContests, updateContest, addContest} from '../actions/contestActions';
import {getCandidates} from '../actions/candidateActions';
import {getIssues} from '../actions/issueActions';
import styles from './css/ContestEditor.module.css';


const ContestEditor = (props) => {

    useEffect(()=>{
        props.getCandidates();
        props.getContests();
        props.getIssues();
    },[])

    const newContest = {
        name: '',
        description: '',
        candidates: [],
        issues: [],
    }

    const [isDropdownOpen, toggleDropdown] = useState(false);

    const [selectedContest, setSelectedContest] = useState(null);
    const [persistantName, setPersistantName] = useState('');

    const onNameChange = (event) => {
        event.persist();
        setSelectedContest({
            ...selectedContest,
            name: event.target.value,
        })
    }

    const onDescriptionChange = (event) => {
        event.persist();
        setSelectedContest({
            ...selectedContest,
            description: event.target.value,
        })
    }

    const changeContest = (contest) => {
        setPersistantName(contest.name);
        setSelectedContest(contest);
    }

    const createNewContest = () => {
        setSelectedContest(newContest);
        setPersistantName('New contest');
    }

    const toggleDefaultStatus = () => {

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

    const saveContest = () => {

        if(selectedContest._id){
            props.updateContest(selectedContest);
        } else {
            props.addContest(selectedContest);
        }
    }

    // -- Code for Candidate Selector --
    const getCandidateById = (id) => props.candidates.filter(item => item._id === id)[0];
    const getCandidateList = () => selectedContest ? selectedContest.candidates.map(id => getCandidateById(id)).filter(item=> (item && item._id)) : [];
    const candidates = getCandidateList().sort((a,b)=> a.name > b.name ? 1 : -1);

    const [multiSelectedCandidates, setMultiSelectedCandidates] = useState([]);

    const onCandidateSelect = (event) => {
        event.persist();
        //Filter selected items
        const selectedCandidateIds = Array.from(event.target.children).filter(item =>item.selected).map(i => i.value);
        setMultiSelectedCandidates(selectedCandidateIds);
    }

    const addCandidates = (event) => {
        event.preventDefault();

        const candidateList = [...selectedContest.candidates];

        multiSelectedCandidates.forEach(element => {
            if(!candidateList.includes(element)){
                candidateList.push(element);
            }
        });

        setSelectedContest({
            ...selectedContest,
            candidates: candidateList,
        })
    }

    const removeCandidateById = (id) => {
        const newList = selectedContest.candidates.filter(item => item !== id);
        setSelectedContest({
            ...selectedContest,
            candidates: newList,
        });
    }

    // -- Code for Issue Selector --
    const getIssueById = (id) => props.issues.filter(item => item._id === id)[0];
    const getIssueList = () => selectedContest ? selectedContest.issues.map(id => getIssueById(id)).filter(item => (item && item._id)) : [];
    const issues = getIssueList().sort((a,b)=> a.name > b.name ? 1 : -1);

    const [multiSelectedIssues, setMultiSelectedIssues] = useState([]);

    const onIssueSelect = (event) => {
        event.persist();
        const selectedIssueIds = Array.from(event.target.children).filter(item =>item.selected).map(i => i.value);
        setMultiSelectedIssues(selectedIssueIds);
    }

    const addIssues = (event) => {
        event.preventDefault();

        const issueList = [...selectedContest.issues];

        multiSelectedIssues.forEach(element => {
            if(!issueList.includes(element)){
                issueList.push(element);
            }
        });

        setSelectedContest({
            ...selectedContest,
            issues: issueList,
        })
    }

    const removeIssueById = (id) => {
        const newList = selectedContest.issues.filter(item => item !== id);
        setSelectedContest({
            ...selectedContest,
            issues: newList,
        });
    }

    return (
        <div className={styles.container}>
            
            <h1>Contest Editor</h1>
            <h3 className={styles.selectedContestTitle}>{persistantName ? persistantName: 'No Contest Selected'}</h3>

            {/* Contest Selector */}
            <Dropdown color="primary" className={styles.contestSelector} isOpen={isDropdownOpen} toggle={()=>toggleDropdown(!isDropdownOpen)}>
                <DropdownToggle outline color="primary" caret>Select a contest</DropdownToggle>
                <DropdownMenu>
                    {props.contests.contests.map(item => 
                        <DropdownItem key={item._id} onClick={()=>changeContest(item)}>
                            {item.name}
                        </DropdownItem>)}
                    <DropdownItem divider/>
                    <DropdownItem onClick={createNewContest}>
                        Create New...
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {/* Contest Detail Editor*/}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input value={selectedContest ? selectedContest.name : ''} onChange={onNameChange} disabled={!selectedContest}/>
            </InputGroup>
            <br />

            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Description</InputGroupText>
                </InputGroupAddon>
                <Input value={selectedContest ? selectedContest.description : ''} onChange={onDescriptionChange} disabled={!selectedContest}/>
            </InputGroup>  
            <br />

            <FormGroup check>
                <Label check>
                    <Input checked={selectedContest ? selectedContest.default : false} onClick={toggleDefaultStatus} type="checkbox" />
                    {' '}Make default contest
                </Label>
            </FormGroup>

            {/*Candidate Selector*/}
            <br />
            <h4>Candidates</h4>

            <Form onSubmit={addCandidates}>
                <FormGroup row>
                    <Col>
                        <ul className={styles.linkedCandidateList}>
                            {candidates.map(candidate => 
                            <li key={candidate._id}>{candidate.name} <span onClick={()=>removeCandidateById(candidate._id)}>(x)</span></li>)}
                        </ul>                
                    </Col>
                    <Col>
                        <Input className={styles.multiSelect} type="select" name="selectMulti" id="candidateSelectMulti" multiple disabled={!selectedContest} onChange={onCandidateSelect} value={multiSelectedCandidates}>
                            {props.candidates ? props.candidates
                                .sort((a,b)=>a.name > b.name ? 1 : -1)
                                .map(item=>(
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                )) : null}
                        </Input>
                        <Button disabled={!selectedContest}>Add Candidates</Button>
                    </Col>
                </FormGroup>
            </Form>
            <hr />

            {/* Issue Selector */}
            <h4>Issues</h4>

            <Form onSubmit={addIssues}>
                <FormGroup row>
                    <Col>
                        <ul className={styles.linkedCandidateList}>
                            {issues.map(issue => 
                            <li key={issue._id}>{issue.name} <span onClick={()=>removeIssueById(issue._id)}>(x)</span></li>)}
                        </ul>       
                    </Col>
                    <Col>
                        <Input className={styles.multiSelect} type="select" name="selectMulti" id="issueSelectMulti" multiple disabled={!selectedContest} onChange={onIssueSelect} value={multiSelectedIssues}>
                            {props.issues ? props.issues
                                .sort((a,b)=>a.name > b.name ? 1 : -1)
                                .map(item=>(
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                )) : null}
                        </Input>
                        <Button disabled={!selectedContest}>Add Issues</Button>
                    </Col>
                    
                </FormGroup>
            </Form>
            <hr />

            <Button color="primary" onClick={saveContest} disabled={!selectedContest}>Save</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    contests: state.contests,
    candidates: state.candidates.candidates,
    issues: state.issues.issues,
})

export default connect(mapStateToProps, {getContests, updateContest, addContest, getCandidates, getIssues})(ContestEditor);
