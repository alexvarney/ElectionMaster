import React, {useState} from 'react';
import {Form, FormGroup, Col, Input, Button} from 'reactstrap';

export default function ContestCandidateEditor(props) {

    const {styles, candidates, selectedContest, setSelectedContest} = props;

    const getCandidateById = (id) => {
        const result = candidates.filter(item => item._id === id)[0];
        return (result) ? result : {unknown: true};
    }

    const getCandidateList = () => selectedContest ? selectedContest.candidates.map(id => getCandidateById(id)).filter(item=> (item && item._id)) : [];

    const sortedCandidates = getCandidateList().sort((a,b)=> a.name > b.name ? 1 : -1);

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
    
    return (
        <div>
            <Form onSubmit={addCandidates}>
                <FormGroup row>
                    <Col>
                        <ul className={styles.linkedCandidateList}>
                            {sortedCandidates.map(candidate => 
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
        </div>
    )
}
