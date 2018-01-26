
import { SET_AUTH_LOGIN, RESET_AUTH , SET_LOGIN_DESC} from "../constants"
import {alertMessage} from "./desc"
export function setAuth(payload) {
  return (dispatch, getState) => { 
    
    fetch('http://localhost:8000/api/login', {
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

        dispatch(alertMessage({message:response.message}))
        dispatch({ type: SET_AUTH_LOGIN, payload:{ success: response.success, username:payload.username, role:response.role , username:response.username, user_id:response.user_id, pp:response.user_pp, token:response.token} })
          if(response.success){
            console.log(response.user_id,11)
           response.isAuth = response.success; 
           localStorage.setItem('auth',JSON.stringify(response))
            setTimeout(() => {
            window.location = "#/"
          },   3000);
        }
    })
  }
}
export function resetLogin() {

  localStorage.removeItem('auth')
  
  return { type: RESET_AUTH }
}
