import { SET_LOGIN_DESC} from "../constants"
const defaultState = {
  message:""
}

export default (state = defaultState, action = {}) => {
   
  switch (action.type) {
    case SET_LOGIN_DESC:
      return {
        message:action.payload.message
      }
      break
    default:
      return state
  }
}