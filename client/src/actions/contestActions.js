import axios from 'axios';

export const getContests = () => dispatch => {
    axios.get('/api/contests')
    .then(res=>dispatch({
        type: 'GET_CONTESTS',
        payload: res.data,
    }))
}

export const updateContest = (contest) => dispatch => {
    axios.put(`/api/contests/${contest._id}`, contest)
        .then(res=>dispatch({
            type: 'UPDATE_CONTEST',
            payload: res.data,
        }))
}

export const addContest = (contest) => dispatch => {
    axios.post(`/api/contests`, contest)
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