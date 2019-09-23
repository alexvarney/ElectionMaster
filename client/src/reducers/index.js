import { combineReducers } from 'redux'
import candidateReducer from './candidateReducer'
import issueReducer from './issueReducer'
import userReducer from './userReducer'
import contestReducer from './contestReducer'

export default combineReducers({
  candidates: candidateReducer,
  issues: issueReducer,
  user: userReducer,
  contests: contestReducer
})
