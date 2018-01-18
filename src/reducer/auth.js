import { SET_AUTH_LOGIN, RESET_AUTH } from "../constants"
const defaultState = {
  username:localStorage.getItem('username'),
  role:localStorage.getItem('role'),
  isAuth:localStorage.getItem('token') ? true : false,
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        isAuth:action.payload.success,
        role:action.payload.role
      }
      break
    case RESET_AUTH:
      return {
        isAuth:false
      }
      break
    default:
      return state
  }
}