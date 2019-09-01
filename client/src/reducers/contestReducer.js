const initialState = {contests: [], selectedContestId: null}

export default function(state = initialState, action){
    switch(action.type){
        case('GET_CONTESTS'):
            console.log('Get contests...')
            return {
                ...state,
                contests: action.payload,
            }
        case('UPDATE_CONTEST'):
            const {_id} = action.payload;
            const contests = state.contests.filter(contest => contest._id !== _id);
            return {
                ...state,
                contests: [
                    ...contests, 
                    action.payload
                ],
            }
        case('SET_SELECTED_CONTEST'):
            return {
                ...state,
                selectedContestId: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}