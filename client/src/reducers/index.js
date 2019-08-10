import {combineReducers} from 'redux';
import candidateReducer from './candidateReducer';
import issueReducer from './issueReducer';
import userReducer from './userReducer';

export default combineReducers({
    candidates: candidateReducer,
    issues: issueReducer,
    user: userReducer,
});