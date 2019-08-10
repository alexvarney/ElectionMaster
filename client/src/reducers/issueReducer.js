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
                    action.payload,
                    ...state.issues.filter(item=>item._id !== action.payload._id)
                ]
            }
        default:
            return { ...state }
    }
}