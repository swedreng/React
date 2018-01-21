import {USER_SIGNUP} from "../constants"
import {alertMessage} from "./desc"

export function signUp(payload) { 
  console.log(payload)
  return (dispatch, getState, api) => { 
    fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: payload.firstname,
        lastname: payload.lastname,
        username: payload.username,
        password: payload.password,
        email: payload.email
        })
    
      }).then(response => response.json()).then(response => {
        dispatch(alertMessage({message:response.message}))
        if(response.success === true){
          dispatch({ type: USER_SIGNUP, payload: { result: response.success}})
          setTimeout(function(){ 
            window.location = "#/login"
           }, 3000);
        }else{
          setTimeout(function(){ 
            window.location = "#/signup"
           }, 3000);
         
        }
       
      })
   
  }
}