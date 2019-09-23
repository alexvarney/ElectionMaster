const initialState = { contests: [], selectedContestId: null }

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_CONTESTS':
      return {
        ...state,
        contests: action.payload
      }
    case 'UPDATE_CONTEST': {
      const { _id } = action.payload
      const contests = state.contests.filter(contest => contest._id !== _id)
      return {
        ...state,
        contests: [...contests, action.payload]
      }
    }
    case 'SET_SELECTED_CONTEST':
      return {
        ...state,
        selectedContestId: action.payload
      }
    case 'DELETE_CONTEST': {
      const newList = state.contests.filter(
        contest => contest._id !== action.payload._id
      )
      return {
        ...state,
        contests: [...newList]
      }
    }
    default:
      return {
        ...state
      }
  }
}
