import { SHARE_WRITE } from "../constants"
const defaultState = {
  result:null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SHARE_WRITE:
      return {
        ...state,
        result:action.payload
      }
      break
    default:
      return state
  }
}