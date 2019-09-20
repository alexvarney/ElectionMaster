import React, {useState} from 'react'
import {InputGroup, InputGroupText, InputGroupAddon, Input, Form, FormGroup, Label, Button, Col, Table} from 'reactstrap';

export default function ContestIssueEditor(props) {

    const {styles, issues, selectedContest, setSelectedContest} = props;

    const getIssueById = (id) => issues.filter(item => item._id === id)[0];
    
    const getIssueList = () => selectedContest ? selectedContest.issues.map(id => getIssueById(id)).filter(item => (item && item._id)) : [];
    
    const sortedIssues = getIssueList().sort((a,b)=> a.name > b.name ? 1 : -1);

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
        <div>
            <Form onSubmit={addIssues}>
                <FormGroup row>
                    <Col>
                        <ul className={styles.linkedCandidateList}>
                            {sortedIssues.map(issue => 
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
        </div>
    )
}
