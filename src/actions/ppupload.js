import {PP_UPLOAD,SET_AUTH_LOGIN} from "../constants"
import {alertMessage} from "./desc"
export function profilpictureUpload(payload) {
    
   return (dispatch, getState) => { 
     let { auth } = getState()

     let { files} = payload
     let data = new FormData()
     data.append('files', files)
     
     fetch(`http://localhost:8000/api/user/pp`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${auth.token} `
       },
       body : data
       }).then(response => response.json()).then(response => {
              if(response.success){
                const newAuth = {
                  username: auth.username,
                  role: auth.role,
                  user_id: auth.user_id,
                  token: auth.token,
                  user_pp: response.user_pp,
                  isAuth: auth.isAuth
                }
                localStorage.setItem('auth',JSON.stringify(newAuth))
                dispatch({type:SET_AUTH_LOGIN, payload:{ success: response.success, username:newAuth.username, role:newAuth.role , username:newAuth.username, user_id:newAuth.user_id, pp:newAuth.user_pp, token:newAuth.token}})
                dispatch({type: PP_UPLOAD, payload:response.success}) 
              }
     })
   }
  }
  