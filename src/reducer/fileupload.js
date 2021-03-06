import { FILE_UPLOAD , PP_UPLOAD } from "../constants"
const defaultState = {
  result:null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        result:action.payload
      }
      break
    default:
      return state
  }
}