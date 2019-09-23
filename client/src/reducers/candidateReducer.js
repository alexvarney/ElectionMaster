const initialState = { candidates: [], selectedCandidateId: null }

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_CANDIDATES':
      return {
        ...state,
        candidates: action.payload
      }
    case 'SET_SELECTED_CANDIDATE':
      return {
        ...state,
        selectedCandidateId: action.payload
      }
    case 'UPDATE_CANDIDATE': {
      const { _id } = action.payload
      const candidates = state.candidates.filter(
        candidate => candidate._id !== _id
      )

      return {
        ...state,
        candidates: [...candidates, action.payload]
      }
    }
    case 'CREATE_CANDIDATE':
      return {
        ...state,
        candidates: [...state.candidates, action.payload]
      }
    case 'DELETE_CANDIDATE': {
      const newList = state.candidates.filter(
        candidate => candidate._id !== action.payload._id
      )
      return {
        ...state,
        candidates: [...newList]
      }
    }

    default:
      return state
  }
}
