import { SET_LOGIN_DESC} from "../constants"
const defaultState = {
  message:"",
  result:null
}

export default (state = defaultState, action = {}) => {
   
  switch (action.type) {
    case SET_LOGIN_DESC:
      return {
        message:action.payload.message,
        result:action.payload.success
      }
      break
    default:
      return state
  }
}