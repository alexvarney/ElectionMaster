import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import {getIssues} from '../../actions/issueActions';

import IssueEditForm from './IssueEditForm';

import styles from './css/Issues.module.css';

export class Issues extends Component {

    componentDidMount(){
        this.props.getIssues();
    }

    render() {

        const {match} = this.props;

        return (
                
                <div className={styles.container}>
                    <Route exact path={`${match.path}/edit`} component={IssueEditForm} />
                    {this.props.issues.issues.map(issue => {
                        return (
                            <div className={styles.issue}>
                                <h3>{issue.name}</h3>
                                <p className={styles.description}><ReactMarkdown source={issue.description} /></p>
                            </div>
                        )
                    })}
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issues: state.issues,  
})

export default connect(mapStateToProps, {getIssues})(Issues)
