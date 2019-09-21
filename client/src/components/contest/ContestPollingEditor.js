import React, {useState} from 'react';
import moment from 'moment';
import {InputGroup, InputGroupText, InputGroupAddon, Input, Form, FormGroup, Label, Button, Col, Table} from 'reactstrap';

export default function ContestPollingEditor(props) {

    const {styles, selectedContest, setSelectedContest, getCandidateById} = props;

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

    return (
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
                    <Button color="primary" disabled={!selectedContest} onClick={updatePoll}>Update Poll</Button>
                    <Button color="danger" onClick={deletePoll} disabled={!selectedContest}>Delete Poll</Button>
                    <Button disabled={!selectedContest} onClick={()=>setSelectedPoll(newPoll)}>New Poll</Button>
                </FormGroup>
            </Form>
    )
}
