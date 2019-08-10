import React, { Component } from 'react';   
import styles from './css/CandidatePositionCard.module.css';
import ReactMarkdown from 'react-markdown';

export default class CandidatePositionCard extends Component {

    constructor(props){
        super(props);

        this.state = {
            isExpanded: false,
        }
    }

    expandContainer = () => {
        this.setState(prevState=>{
            return {
                isExpanded: true,
            }
        })
    }

    contractContainer = (event) => {
        event.stopPropagation();
        this.setState(prevState=>{
            return {
                isExpanded: false,
            }
        })
    }

    render() {
        //Get Issue
        const issue = this.props.issues.filter(item=>item._id === this.props.position.issue)[0];
        if (!issue) return null;
    
        const getIcon = (status) => {
            switch(status){
                case 'supports':
                    return (<i className="far fa-check-circle"></i>)
                case 'opposed': 
                    return (<i className="far fa-times-circle"></i>)
                default:
                    return(<i className="far fa-question-circle"></i>)
            }
        }
    
        const getContainerColors = (status) => {
            switch(status){
                case 'supports':
                    return ({background:'#CEF6E3',color:'#0D472C'})
                case 'opposed': 
                    return ({background:'#F6CECE',color:'#470D0D'})
                default:
                    return ({background:'#F7F1D2',color:'#473D0D'})
            }
        }

        const getContainerStyle = () => {

            const cursor = {cursor: this.state.isExpanded ? 'default' : 'pointer',}
            return {...cursor, ...getContainerColors(this.props.position.status)}

        }

        return (
            <div onClick={this.expandContainer} className={styles.container} style={getContainerStyle(this.props.position.status)}>
                <div className={styles.row}>
                    <div className={styles.title}>{issue.name}</div>
                    <div>{getIcon(this.props.position.status)}</div>
                </div>
                
                    <div className={(this.state.isExpanded)?styles.descriptionContainer_active:styles.descriptionContainer}>
                        <div className={styles.description}>                
                            <ReactMarkdown source={this.props.position.description} />
                            {this.props.position.links.map((item, index)=><a key={item._id} href={item.url}>[{index+1}]</a>)}
                        </div>
                        <span className={styles.closeButton}>
                            <i onClick={(e)=>this.contractContainer(e)} className="fas fa-times"></i>
                        </span>
                    </div>
            </div>
        )
    }
}
