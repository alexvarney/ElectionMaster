import axios from 'axios';

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

export const updateIssue = (issue) => dispatch => {
    console.log(issue);
    axios.put(`/api/issues/${issue._id}`, issue)
    .then(res=>
        dispatch({
            type: 'UPDATE_ISSUE',
            payload: res.data,            
        }))
}