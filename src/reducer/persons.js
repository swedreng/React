import { PERSONS } from "../constants"

const defaultState = {
  persons: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case PERSONS:
        return {...state, persons:action.payload}
      break
   default:
     return state
  }
}