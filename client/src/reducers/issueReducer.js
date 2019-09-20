const initialState = {issues: []};

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_ISSUES':
            return {
                ...state,
                issues: action.payload,
            }
        case 'UPDATE_ISSUE':
            return {
                ...state,
                issues: [
                    ...state.issues.filter(item=>item._id !== action.payload._id),
                    action.payload,
                ]
            }
        case 'DELETE_ISSUE':
            const newList = state.issues.filter(issue => issue._id !== action.payload._id);
            return {
                ...state,
                issues: [...newList],
            }
        default:
            return { ...state }
    }
}