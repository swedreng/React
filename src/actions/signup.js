import {USER_SIGNUP} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function signUp(payload) { 
  return (dispatch, getState, api) => { 
    axios(`${process.env.URL}/api/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        firstname: payload.firstname,
        lastname: payload.lastname,
        username: payload.username,
        password: payload.password,
        email: payload.email
        })
    
      }).then(response => {
        dispatch(alertMessage({message:response.message}))
        dispatch({ type: USER_SIGNUP, payload: { result: response.success}})
        if(response.success){
          setTimeout(function(){ 
            window.location = "#/login"
           }, 3000);
        }else{
          setTimeout(function(){ 
            window.location = "#/signup"
           }, 3000);
         
        }
       
      }).catch(error => {
        dispatch(alertMessage({message:error.response.data.message}))
        dispatch({ type: USER_SIGNUP, payload: { result: error.response.data.success}})
      })
   
  }
}