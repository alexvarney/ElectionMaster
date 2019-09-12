import React, {useState, useDebugValue} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styles from './css/IssuePanel.module.css';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col} from 'reactstrap';
import CandidateListCard from '../candidate/CandidateListCard';

const IssuePanel = (props) => {

  const {issue, contest, candidates} = props;
  
  const positions = candidates
    .filter(candidate => contest.candidates.includes(candidate._id))
    .map(candidate=>{
      const position = candidate.positions.filter(positions => positions.issue === issue._id)[0];
      if(position){
        return {
          candidate: candidate,
          position: position,
        }
      }
    })
    .filter(item => item)
    .reduce( (accumulator, currentValue) => {
      if(!accumulator[currentValue.position.status]){
        accumulator[currentValue.position.status] = []
      }
      accumulator[currentValue.position.status].push(currentValue);

      return accumulator;

    }, {});

    const {supports, mixed, opposed} = positions;
    
    const [redirect, setRedirect] = useState(null);

    if(redirect){
      return <Redirect to={`/candidates/${redirect}`} />
    }

  return (
    <div>
      <h1>{props.issue.name}</h1>
      <ReactMarkdown source={issue.description} />
      
      <h3>Candidate Positions</h3>

      <Container>
        <Row>
          <Col>
            <h4>Supports</h4>
            <ul className={styles.positionCandidateList}>
              {supports ? supports.map(item => <li><CandidateListCard onSelect={setRedirect} candidate={item.candidate}/></li>) : null}
            </ul>
          </Col>
          <Col>
            <h4>Mixed</h4>
            <ul className={styles.positionCandidateList}>
              {mixed ? mixed.map(item => <li><CandidateListCard onSelect={setRedirect} candidate={item.candidate}/></li>) : null}
            </ul>
          </Col>
          <Col>
            <h4>Opposed</h4>
            <ul className={styles.positionCandidateList}>
              {opposed ? opposed.map(item => <li><CandidateListCard onSelect={setRedirect} candidate={item.candidate}/></li>) : null}
            </ul>
          </Col>
        </Row>
      </Container>
    
    </div>
  )
}

const mapStateToProps = (state) => ({
  candidates: state.candidates.candidates,
});

export default connect(mapStateToProps, {})(IssuePanel);