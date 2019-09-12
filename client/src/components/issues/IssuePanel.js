import React, {useState, useDebugValue} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styles from './css/IssuePanel.module.css';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col} from 'reactstrap';
import CandidatePositionButton from './CandidatePositionButton';
import PieChart from 'react-minimal-pie-chart';
import {getSubtleColor} from '../_helpers';

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

    const supports = (positions.supports) ? positions.supports : [];
    const mixed = (positions.mixed) ? positions.mixed : [];
    const opposed = (positions.opposed) ? positions.opposed : [];

    const totalPositions = supports.length + mixed.length + opposed.length;

    const chartData = [
      {
        title: `Supports - ${supports.length*100/totalPositions}%`, 
        value: supports.length,
        color: '#0d9900',
      },
      {
        title: `Mixed - ${mixed.length*100/totalPositions}%`, 
        value: mixed.length,
        color: '#c2bb00',
      },
      {
        title: `Opposed - ${opposed.length*100/totalPositions}%`, 
        value: opposed.length,
        color: '#ac2715',
      }
    ]
  return (
    <div className={styles.container}>
      
      <h1>{props.issue.name}</h1>

      <hr />

      <div className={styles.positionContainer}>
        
        <div className={styles.pieContainer}>
          
          <p>Candidate Positions</p><br />
          
          <PieChart className={styles.pieChart} data={chartData}/>
          
          <div className={styles.pieChartLabels}>      
            <p className={styles.pieLabelSupports}>Supports - {Math.floor(supports.length*100/totalPositions)}%</p>
            <p className={styles.pieLabelMixed}>Mixed - {Math.floor(mixed.length*100/totalPositions)}%</p>
            <p className={styles.pieLabelOpposed}>Opposed - {Math.floor(opposed.length*100/totalPositions)}%</p>
          </div>
        
        </div>
        
        <div>
          <h4><i className="far fa-check-circle"></i> Supports - ({supports ? supports.length : 0})</h4>
          {supports ? supports.map(item =><CandidatePositionButton candidate={item.candidate}/>) : null}
        </div>
        
        <div>
          <h4><i className="fas fa-adjust"></i> Mixed - ({mixed ? mixed.length : 0})</h4>
          {mixed ? mixed.map(item =><CandidatePositionButton candidate={item.candidate}/>) : null}
        </div>
        
        <div>
          <h4><i className="far fa-times-circle"></i> Opposed - ({opposed ? opposed.length : 0})</h4>
          {opposed ? opposed.map(item =><CandidatePositionButton candidate={item.candidate}/>) : null}
        </div>

      </div>
      <hr />
      <ReactMarkdown source={issue.description} />
    
    </div>
  )
}

const mapStateToProps = (state) => ({
  candidates: state.candidates.candidates,
});

export default connect(mapStateToProps, {})(IssuePanel);
