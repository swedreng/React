import { PERSONS,VİEW_PERSON } from "../constants"
import { LOCATION_CHANGE } from 'react-router-redux'
const defaultState = {
  person: []
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case VİEW_PERSON:
        return {...state, person:action.payload}
      break
    case LOCATION_CHANGE:
      return defaultState  
   default:
     return state
  }
}