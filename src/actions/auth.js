
import { SET_AUTH_LOGIN, RESET_AUTH , SET_USER, SET_LOGIN_DESC} from "../constants"
import {alertMessage} from "./desc"
export function setAuth(payload) {
  return (dispatch, getState, api) => { 
    
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
        console.log(response.token)
        console.log(response.username)
        console.log(response.role)
        dispatch(alertMessage({message:response.message}))
        dispatch({ type: SET_AUTH_LOGIN, payload:{ success: response.success, username:payload.username, role:response.role} })
          if(response.success){
            
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('role', response.role)
            
            setTimeout(() => {
            window.location = "#/"
          },   3000);
        }
    })
  }
}
export function resetLogin() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  
  return { type: RESET_AUTH }
}
