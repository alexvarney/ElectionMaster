const initialState = {issues: []};

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_ISSUES':
            return {
                ...state,
                issues: action.payload,
            }
        default:
            return { ...state }
    }
}