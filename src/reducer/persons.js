import { PERSONS } from "../constants"

const defaultState = {
  persons: [],
  persons_count:null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case PERSONS:
        return {...state, persons:action.payload.data, persons_count:action.payload.persons_count}
      break
   default:
     return state
  }
}