import { SET_CATEGORIES } from "../constants"

const defaultState = {
  categories: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SET_CATEGORIES:
        return {...state, categories:action.payload}
      break
   default:
     return state
  }
}