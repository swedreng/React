
import { push } from 'react-router-redux'
import { history } from '../store'
import { SET_AUTH_LOGIN, RESET_AUTH , SET_LOGIN_DESC, PASSWORD_RESET,REMEMBER_ME} from "../constants"
import {alertMessage} from "./desc"
import { getlocalStore } from '../helper';


export function setAuth(payload) {
  return (dispatch, getState) => { 
    
    fetch(`${process.env.URL}/api/login`, {
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
        dispatch({ type: SET_AUTH_LOGIN, payload:{ success: response.success, username:payload.username, role:response.role , username:response.username, user_id:response.user_id, pp:response.user_pp, token:response.token, personalwriting:response.personalwriting} })
          if(response.success){
            console.log(response.user_id,11)
           response.isAuth = response.success; 
           localStorage.setItem('auth',JSON.stringify(response))
            setTimeout(() => {
              dispatch(push('/'))
              //history.push('/')
          },   3000);
        }
    })
  }
}

export function PasswordReset(payload) {
  return (dispatch, getState) => { 

    fetch(`${process.env.URL}/api/passwordreset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email
        })
      }).then(response => response.json()).then(response => {
        dispatch(alertMessage({message:response.message}))
    })
  }
}
export function rememberMe(payload){
  localStorage.setItem('rememberMe',JSON.stringify(payload))
}
export function getRememberMe(payload){
  return (dispatch, getState) => { 
      var rememberme  = JSON.parse(localStorage.getItem('rememberMe'))
      if(rememberme){
        dispatch({type:REMEMBER_ME, payload:rememberme})
      }else{
        rememberme = {}
        localStorage.setItem('rememberMe',JSON.stringify(rememberme))
      }
      
  }
}

export function PasswordUpdate(payload) {
  return (dispatch, getState) => { 
    console.log(payload.token,payload.password)
    fetch(`${process.env.URL}/api/passwordupdate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: payload.password,
        token: payload.token
        })
      }).then(response => response.json()).then(response => {
        dispatch(alertMessage({message:response.message}))
    })
  }
}


export function resetLogin() {
  localStorage.removeItem('auth')
  
  return { type: RESET_AUTH }
}
