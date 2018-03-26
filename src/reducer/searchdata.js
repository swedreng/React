import { SEARCH_DATA } from "../constants"

const defaultState = {
  search_data: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SEARCH_DATA:
        return {...state, search_data:action.payload}
      break
   default:
     return state
  }
}