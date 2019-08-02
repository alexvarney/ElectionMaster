import axios from 'axios';

export const getIssues = () => dispatch => {
    axios.get('/api/issues')
    .then(res=>
        dispatch({
            type: 'GET_ISSUES',
            payload: res.data,
        }))
}