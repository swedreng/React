import { SET_BESTPOSTS, SET_BESTPOST } from "../constants"

const defaultState = {
  bestposttoday: [],
  bestpost: null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SET_BESTPOSTS:
        return {...state, bestposttoday:action.payload}
      break
    case SET_BESTPOST:
      return {...state, bestpost:action.payload}
    break  
   default:
     return state
  }
}