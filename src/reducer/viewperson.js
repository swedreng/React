import { PERSONS,VİEW_PERSON } from "../constants"

const defaultState = {
  person: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case VİEW_PERSON:
        return {...state, person:action.payload}
      break
   default:
     return state
  }
}