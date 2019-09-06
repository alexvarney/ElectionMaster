import axios from 'axios';
import ls from 'local-storage';

export const getContests = () => dispatch => {
    axios.get('/api/contests')
    .then(res=>dispatch({
        type: 'GET_CONTESTS',
        payload: res.data,
    }))
}

export const updateContest = (contest) => dispatch => {
    const token = ls.get('em-token') || '';
    axios.put(`/api/contests/${contest._id}`, contest, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }})
        .then(res=>dispatch({
            type: 'UPDATE_CONTEST',
            payload: res.data,
        }))
}

export const addContest = (contest) => dispatch => {
    const token = ls.get('em-token') || '';
    axios.post(`/api/contests`, contest, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }})
        .then(res=> dispatch({
            type: 'UPDATE_CONTEST',
            payload: res.data,
        }))
}

export const setSelectedContestId = (id) => dispatch => {
    dispatch({
        type: 'SET_SELECTED_CONTEST',
        payload: id,
    })
}

export const deleteContest = (contest) => dispatch => {
    const token = ls.get('em-token') || '';
    axios.delete(`/api/contests/${contest._id}`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }});
    dispatch({
        type: 'DELETE_CONTEST',
        payload: contest,
    });
}