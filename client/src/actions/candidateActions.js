import axios from 'axios';

export const getCandidates = () => dispatch => {
    axios.get('/api/candidates')
    .then(res=>
        dispatch({
            type: 'GET_CANDIDATES',
            payload: res.data,
        }))
}

export const setSelected = (id) => dispatch => {
    dispatch({
        type: 'SET_SELECTED_CANDIDATE',
        payload: id,
    })
}

export const updateCandidate = (candidate) => dispatch => {
    axios.put(`/api/candidates/${candidate._id}`, candidate)
        .then(res=>dispatch({
            type: 'UPDATE_CANDIDATE',
            payload: res.data,
        }))
}