import axios from 'axios';
import {updateContest} from './contestActions';

export const getIssues = () => dispatch => {
    axios.get('/api/issues')
    .then(res=>
        dispatch({
            type: 'GET_ISSUES',
            payload: res.data,
        }))
}

export const createIssue = (issue) => dispatch => {
    axios.post('/api/issues', issue)
    .then(res=>
        dispatch({
            type: 'UPDATE_ISSUE',
            payload: res.data,
        }))
}

export const createIssueAndAssign = (issue, contest) => {
    return function(dispatch, getState){
        axios.post(`/api/issues/`, issue)
        .then(res=>{
            dispatch({
                type: 'CREATE_CANDIDATE',
                payload: res.data,
            })
            contest.issues.push(res.data._id);
            dispatch(updateContest(contest));
        }) 
    }
}

export const updateIssue = (issue) => dispatch => {
    axios.put(`/api/issues/${issue._id}`, issue)
    .then(res=>
        dispatch({
            type: 'UPDATE_ISSUE',
            payload: res.data,            
        }))
}

export const deleteIssue = (issue) => dispatch => {
    axios.delete(`/api/issues/${issue._id}`)
    .then(res=>
        dispatch({
            type: 'DELETE_ISSUE',
            payload: issue,            
        }))
}