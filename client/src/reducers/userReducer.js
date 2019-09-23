const initialState = { user: {}, token: '', loginFailure: false }

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loginFailure: true
      }
    case 'LOGOUT':
      return {
        ...state,
        ...initialState
      }
    default:
      return { ...state }
  }
}
