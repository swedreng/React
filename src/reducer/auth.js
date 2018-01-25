import { SET_AUTH_LOGIN, RESET_AUTH } from "../constants"
import {getlocalStore} from "../helper"
const { auth } = getlocalStore('auth')

const defaultState = {
  username:auth.username,
  role:auth.role,
  id:auth.id,
  token:auth.token,
  user_pp:auth.user_pp,
  isAuth:auth.isAuth ? true : false,
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
    
      return {
        ...state,
        username: action.payload.username,
        isAuth:action.payload.success,
        role:action.payload.role,
        id:action.payload.id,
        user_pp:action.payload.pp,
        token:action.payload.token
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