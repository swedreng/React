import { SET_CATEGORİES } from "../constants"

const defaultState = {
  categories: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SET_CATEGORİES:
        return {...state, categories:action.payload}
      break
   default:
     return state
  }
}