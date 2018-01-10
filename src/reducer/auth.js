import { SET_AUTH_LOGIN, RESET_AUTH } from "../constants"
const defaultState = {
  username: "",
  pass: "",
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
      return {
        username: action.payload.username,
        pass: action.payload.pass,
        isAuth: true
      }
      break
    case RESET_AUTH:
      return state
      break
    default:
      return state
  }
}