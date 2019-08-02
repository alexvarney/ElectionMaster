import React, { Component } from 'react';   
import styles from './css/CandidatePositionCard.module.css';

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
                    return (<i class="far fa-check-circle"></i>)
                case 'opposed': 
                    return (<i class="far fa-times-circle"></i>)
                default:
                    return(<i class="far fa-question-circle"></i>)
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
                {(this.state.isExpanded ? 
                    <div>
                        <p className={styles.description}>                
                            {this.props.position.description}
                            {this.props.position.links.map((item, index)=><a href={item.url}>[{index+1}]</a>)}
                        </p>
                        <span class={styles.closeButton}>
                            <i onClick={(e)=>this.contractContainer(e)} class="fas fa-times"></i>
                        </span>
                    </div>
                :null)}
            </div>
        )
    }
}
