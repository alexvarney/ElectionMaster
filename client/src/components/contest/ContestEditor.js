import React, {useState, useEffect, useDebugValue} from 'react'
import {connect} from 'react-redux';
import {InputGroup, InputGroupText, InputGroupAddon, Input, Form, FormGroup, Label, Button, Col, Table} from 'reactstrap';
import {getContests, updateContest, addContest, deleteContest} from '../../actions/contestActions';
import {getCandidates} from '../../actions/candidateActions';
import {getIssues} from '../../actions/issueActions';
import styles from './css/ContestEditor.module.css';
import moment from 'moment';
import countries from 'iso-3166-country-list';


const ContestEditor = (props) => {

    useEffect(()=>{
        props.getCandidates();
        props.getContests();
        props.getIssues();
    },[])

    const newContest = {
        name: '',
        description: '',
        country: '',
        url: '',
        candidates: [],
        issues: [],
        polling: [],
    }

    const [isDropdownOpen, toggleDropdown] = useState(false);

    const [selectedContest, setSelectedContest] = useState(props.contest);
    const [persistantName, setPersistantName] = useState(props.contest ? props.contest.name : null);

    useEffect(() => {
        if(props.contest){
            setSelectedContest(props.contest)
            setPersistantName(props.contest.name)
        }
    }, [props.contest])

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

    const onCountryChange = (event) => {
        event.persist();
        setSelectedContest({
            ...selectedContest,
            country: event.target.value,
        })
    }

    const onUrlChange = (event) => {
        event.persist();
        setSelectedContest({
            ...selectedContest,
            url: event.target.value,
        })
    }

    const changeContest = (contest) => {
        setSelectedPoll(newPoll);
        setPersistantName(contest.name);
        setSelectedContest(contest);
    }

    const createNewContest = () => {
        setSelectedPoll(newPoll);
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

    // -- Code for Candidate Selector --
    const getCandidateById = (id) => {
        const result = props.candidates.filter(item => item._id === id)[0];
        return (result) ? result : {unknown: true};
    }

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

    // -- Code for polling data --

    const newPoll = {
        date: moment().format('YYYY-MM-DD'),
        values: [],
    }

    const [selectedPoll, _setSelectedPoll] = useState({});

    const setSelectedPoll = (value) => {
        
        const dateFixed = {
            ...value,
            date: moment(value.date).format('YYYY-MM-DD'),
        }

        _setSelectedPoll(dateFixed);
    
    }

    const setPollDate = (event) => {
        setSelectedPoll({
            ...selectedPoll,
            date: event.target.value,
        })
    }

    const getPollingValue = (candidateId) => {    
        const pollResult = (selectedPoll && selectedPoll.values) ? selectedPoll.values.filter(item=> item.candidate === candidateId)[0] : null;
        return (pollResult) ? pollResult.value : -1;
    }

    const setPollingValue = (event) => {

        const newPoll = {
            candidate: event.target.id,
            value: event.target.value,
        }

        const newList = selectedPoll.values.filter(item => item.candidate !== event.target.id);
        newList.push(newPoll);

        setSelectedPoll({
            ...selectedPoll,
            values: newList,
        });
    }

    const updatePoll = (event) => {
        //Adds or updates a poll to a contest
        event.preventDefault();

        const newList = selectedContest.polling.filter(item => moment(item.date).format('YYYY-MM-DD') !== moment(selectedPoll.date).format('YYYY-MM-DD'));
        newList.push(selectedPoll);

        setSelectedContest({
            ...selectedContest,
            polling: newList,
        });
    }

    const deletePoll = (event) => {
        event.preventDefault();
        const newList = selectedContest.polling.filter(item => moment(item.date).format('YYYY-MM-DD') !== moment(selectedPoll.date).format('YYYY-MM-DD'));
        setSelectedContest({
            ...selectedContest,
            polling: newList,
        });
        setSelectedPoll(newPoll);
    }

    const getPollingCandidates = () => {
        const candidates = selectedContest.candidates.map(item => getCandidateById(item)).filter(res => res.unknown !== true);
        return candidates;
    }

    const getDateSortedPolls = () => {
        return selectedContest.polling.sort((a,b) => (moment(a.date).format('YYYY-MM-DD') < moment(b.date).format('YYYY-MM-DD')) ? 1 : -1);
    }

    useDebugValue(selectedPoll);

    return (
        <div className={styles.container}>
            
            <h1>Contest Editor</h1>
            <h3 className={styles.selectedContestTitle}>{persistantName ? persistantName: 'No Contest Selected'}</h3>

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
            
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>URL</InputGroupText>
                </InputGroupAddon>
                <Input value={selectedContest ? selectedContest.url : ''} onChange={onUrlChange} disabled={!selectedContest}/>
            </InputGroup>
            
            <br />

            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Country</InputGroupText>
                </InputGroupAddon>
                <Input value={selectedContest ? selectedContest.country : ''} onChange={onCountryChange} disabled={!selectedContest}/>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{countries.name(selectedContest && selectedContest.country ? selectedContest.country : '' )}</InputGroupText>
                </InputGroupAddon>
            </InputGroup>


            <br />

            <FormGroup check>
                <Label check>
                    <Input checked={selectedContest && selectedContest.default !== undefined ? selectedContest.default : false} onChange={toggleDefaultStatus} type="checkbox" />
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

            <h4>Polling</h4>
            
            <Form>
                <FormGroup row>
                    <Col>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Date</InputGroupText>
                            </InputGroupAddon>
                            <Input disabled={!selectedContest || !selectedPoll.date} value={(selectedPoll.date) ? selectedPoll.date : ''} onChange={setPollDate} type="date"/>
                        </InputGroup>

                        <Table>
                            <thead>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Polling</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedContest ? getPollingCandidates().map(candidate=>(
                                    <tr key={candidate._id}>
                                        <th>{candidate.name}</th>
                                        <td><Input disabled={!selectedPoll.date} id={candidate._id} value={getPollingValue(candidate._id)} onChange={setPollingValue} type="number"/></td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <ul className={styles.linkedCandidateList}>
                            {selectedContest ? getDateSortedPolls().map(item => (
                                <li onClick={()=>setSelectedPoll(item)} key={item.date}>{moment(item.date).format('YYYY-MM-DD')}</li>
                            )):null}
                        </ul>
                    </Col>
                </FormGroup>
                <FormGroup className={styles.buttonRow} row>
                    <Button color="danger" onClick={deletePoll} disabled={!selectedContest}>Delete Poll</Button>
                    <Button disabled={!selectedContest} onClick={updatePoll}>Update Poll</Button>
                </FormGroup>
            </Form>
            <hr />
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
