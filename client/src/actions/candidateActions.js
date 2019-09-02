import axios from 'axios';
import {updateContest} from './contestActions';

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

export const createCandidate = (candidate) => dispatch => {
    axios.post(`/api/candidates/`, candidate)
        .then(res=>dispatch({
            type: 'CREATE_CANDIDATE',
            payload: res.data,
        }))
}

export const createCandidateAndAssign = (candidate, contest) => {
    return function(dispatch, getState){
        axios.post(`/api/candidates/`, candidate)
        .then(res=>{
            dispatch({
                type: 'CREATE_CANDIDATE',
                payload: res.data,
            })
            contest.candidates.push(res.data._id);
            dispatch(updateContest(contest));
        }) 
    }
}

export const deleteCandidate = (candidate) => dispatch => {
    axios.delete(`/api/candidates/${candidate._id}`);
    dispatch({
        type: 'DELETE_CANDIDATE',
        payload: candidate,
    });
}