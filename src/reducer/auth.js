import { SET_AUTH_LOGIN, RESET_AUTH } from "../constants"
const defaultState = {
  username: "",
  isAuth:null,
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
      return {
        username: action.payload.username,
        isAuth:action.payload.success
      }
      break
    case RESET_AUTH:
      return {username:""}
      break
    default:
      return state
  }
}