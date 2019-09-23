import axios from 'axios'
import { updateContest } from './contestActions'
import ls from 'local-storage'

export const getCandidates = () => dispatch => {
  axios.get('/api/candidates').then(res =>
    dispatch({
      type: 'GET_CANDIDATES',
      payload: res.data
    })
  )
}

export const updateCandidate = candidate => dispatch => {
  const token = ls.get('em-token') || '';
  axios
    .put(`/api/candidates/${candidate._id}`, candidate, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res =>
      dispatch({
        type: 'UPDATE_CANDIDATE',
        payload: res.data
      })
    )
}

export const createCandidate = candidate => dispatch => {
  const token = ls.get('em-token') || '';
  axios
    .post('/api/candidates/', candidate, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res =>
      dispatch({
        type: 'CREATE_CANDIDATE',
        payload: res.data
      })
    )
}

export const createCandidateAndAssign = (candidate, contest) => {
  const token = ls.get('em-token') || '';
  return function (dispatch, getState) {
    axios
      .post('/api/candidates/', candidate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: 'CREATE_CANDIDATE',
          payload: res.data
        })
        contest.candidates.push(res.data._id)
        dispatch(updateContest(contest))
      })
  }
}

export const deleteCandidate = candidate => dispatch => {
  const token = ls.get('em-token') || '';
  axios.delete(`/api/candidates/${candidate._id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  dispatch({
    type: 'DELETE_CANDIDATE',
    payload: candidate
  })
}
