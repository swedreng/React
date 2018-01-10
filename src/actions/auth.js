
import { SET_AUTH_LOGIN, RESET_AUTH , SET_USER} from "../constants"

export function setAuth(payload) {
  return (dispatch, getState, api) => { 
    let { user } = getState()
    console.log(user.username)
    console.log(user.password)
    console.log(payload.username)
    console.log(payload.pass)
    if(user.username == payload.username && user.password == payload.pass){
      payload.auth = true
    }else{
      payload.auth = false
    }

    dispatch({ type: SET_AUTH_LOGIN, payload })
  }
  
}

export function resetLogin() {
  return { type: RESET_AUTH }
}
