import { FILE_UPLOAD} from "../constants"
const defaultState = {
  result:null
}

export default (state = defaultState, action = {}) => {
   
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        result:action.payload.success
      }
      break
    default:
      return state
  }
}