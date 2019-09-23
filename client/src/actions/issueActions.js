import axios from 'axios'
import { updateContest } from './contestActions'
import ls from 'local-storage'

export const getIssues = () => dispatch => {
  axios.get('/api/issues').then(res =>
    dispatch({
      type: 'GET_ISSUES',
      payload: res.data
    })
  )
}

export const createIssue = issue => dispatch => {
  const token = ls.get('em-token') || ''
  axios
    .post('/api/issues', issue, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res =>
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: res.data
      })
    )
}

export const createIssueAndAssign = (issue, contest) => {
  return function (dispatch, getState) {
    const token = ls.get('em-token') || ''
    axios
      .post('/api/issues/', issue, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: 'UPDATE_ISSUE',
          payload: res.data
        })
        const updatedContest = {
          ...contest,
          issues: [...contest.issues, res.data._id]
        }
        dispatch(updateContest(updatedContest))
      })
  }
}

export const updateIssue = issue => dispatch => {
  const token = ls.get('em-token') || ''
  axios
    .put(`/api/issues/${issue._id}`, issue, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res =>
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: res.data
      })
    )
}

export const deleteIssue = issue => dispatch => {
  const token = ls.get('em-token') || ''
  axios
    .delete(`/api/issues/${issue._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res =>
      dispatch({
        type: 'DELETE_ISSUE',
        payload: issue
      })
    )
}
