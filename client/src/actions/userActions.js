import axios from 'axios'
import ls from 'local-storage'

export const login = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      if (res.status === 200) {
        ls.set('em-token', res.data.token)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        })
      } else {
        dispatch({ type: 'LOGIN_FAILURE' })
      }
    })
    .catch(res => dispatch({ type: 'LOGIN_FAILURE' }))
}

export const logout = token => dispatch => {
  ls.remove('em-token')
  axios
    .post(
      '/api/users/me/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => dispatch({ type: 'LOGOUT' }))
}

export const auth = () => dispatch => {
  const token = ls.get('em-token') || ''
  axios
    .get('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: res.data, token: token }
        })
      } else {
        ls.remove('em-token')
        dispatch({ type: 'LOGIN_FAILURE' })
      }
    })
    .catch((err) => {
      if (err) {
        ls.remove('em-token')
        dispatch({ type: 'LOGIN_FAILURE' })
      }
    })
}
