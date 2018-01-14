
import { SET_AUTH_LOGIN, RESET_AUTH , SET_USER, SET_LOGIN_DESC} from "../constants"
import {alertMessage} from "./desc"
export function setAuth(payload) {
  return (dispatch, getState, api) => { 
    
   // let { user } = getState()
    fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.pass
        })
      }).then(response => response.json()).then(response => {
        console.log(response.message)
        console.log(response.success)
        dispatch(alertMessage({message:response.message}))
        dispatch({ type: SET_AUTH_LOGIN, payload:{ success: response.success, username:payload.username} })
        if(response.success){
          setTimeout(() => {
            window.location = "#/"
        }, 3000);
        }
         
    })
  }
  
}
export function resetLogin() {
  return { type: RESET_AUTH }
}
