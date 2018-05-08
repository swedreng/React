import axios from '../myfunctions/myinterceptor'
import { push } from 'react-router-redux'
import { history } from '../store'
import { SET_AUTH_LOGIN, RESET_AUTH , SET_LOGIN_DESC, PASSWORD_RESET,REMEMBER_ME} from "../constants"
import {alertMessage} from "./desc"
import { getlocalStore } from '../helper';


export function setAuth(payload) {
  return (dispatch, getState) => { 
    
    axios(`${process.env.URL}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username: payload.username,
        password: payload.pass
        })
      }).then(response => {

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
      }).catch(error => {
        dispatch(alertMessage({message:error.response.data.message}))
        dispatch({ type: SET_AUTH_LOGIN, payload:{ success: error.response.data.success} })
      })
  }
}

export function PasswordReset(payload) {
  return (dispatch, getState) => { 

    axios(`${process.env.URL}/api/passwordreset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: payload.email
        })
      }).then(response => {
        dispatch(alertMessage({message:response.message}))
    })
  }
}
export function rememberMe(payload){
console.log(payload,77)
  return (dispatch, getState) => { 
    
        axios(`${process.env.URL}/api/rememberme`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            username: payload.username,
            password: payload.pass
            })
          }).then(response => {
            localStorage.setItem('rememberMe',JSON.stringify(response.token))
            dispatch({type:REMEMBER_ME, payload:response.data})
        })
      }

  localStorage.setItem('rememberMe',JSON.stringify(payload))
}
export function getRememberMe(payload){
  return (dispatch, getState) => { 
      var rememberme  = JSON.parse(localStorage.getItem('rememberMe'))
     return axios(`${process.env.URL}/api/getrememberme`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          token: rememberme,
          })
        }).then(response => {
          if(response.success == false){
            rememberme = {}
            localStorage.setItem('rememberMe',JSON.stringify(rememberme))
           
          }else{
            dispatch({type:REMEMBER_ME, payload:response.data})
          }
      })
    }
  }

  export function forgetMe(payload) {
    return (dispatch, getState) => { 
      var rememberme  = JSON.parse(localStorage.getItem('rememberMe'))
     return axios(`${process.env.URL}/api/forgetme`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          token: rememberme,
        })
        }).then(response => {
          dispatch({type:REMEMBER_ME, payload:response.data})
      })
    }
  }  

export function PasswordUpdate(payload) {
  return (dispatch, getState) => { 
    console.log(payload.token,payload.password)
    axios(`${process.env.URL}/api/passwordupdate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        password: payload.password,
        token: payload.token
        })
      }).then(response => {
        dispatch(alertMessage({message:response.message}))
        setTimeout(() => {
          dispatch(push('/login'))
        },3000);
    })
  }
}


export function resetLogin() {
  localStorage.removeItem('auth')
  
  return { type: RESET_AUTH }
}
