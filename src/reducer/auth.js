import { SET_AUTH_LOGIN, RESET_AUTH ,REMEMBER_ME} from "../constants"
import {getlocalStore} from "../helper"
const { auth } = getlocalStore('auth')

const defaultState = {
  username:auth.username,
  role:auth.role,
  user_id:auth.user_id,
  token:auth.token,
  user_pp:auth.user_pp,
  personalwriting: auth.personalwriting,
  isAuth:auth.isAuth ? true : false,
  rememberme:null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOGIN:
    
      return {
        ...state,
        username: action.payload.username,
        isAuth:action.payload.success,
        role:action.payload.role,
        user_id:action.payload.user_id,
        user_pp:action.payload.pp,
        token:action.payload.token
      }
      break
    case RESET_AUTH:
      return {
        isAuth:false
      }
      break
    case REMEMBER_ME:
      return {
        ...state,
        rememberme: action.payload
      }
      break
    default:
      return state
  }
}