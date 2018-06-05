import { PERSONS } from "../constants"
import { LOCATION_CHANGE } from 'react-router-redux'
const defaultState = {
  persons: [],
  persons_count:null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case PERSONS:
        return {...state, persons:action.payload.data, persons_count:action.payload.persons_count}
      break
    case LOCATION_CHANGE:
      return state
   default:
     return state
  }
}