import {combineReducers} from 'redux';
import candidateReducer from './candidateReducer';
import issueReducer from './issueReducer';

export default combineReducers({
    candidates: candidateReducer,
    issues: issueReducer,
});