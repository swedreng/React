import {PP_UPLOAD,SET_AUTH_LOGIN} from "../constants"
import {alertMessage} from "./desc"
export function profilpictureUpload(payload) {
    
   return (dispatch, getState) => { 
     let { auth } = getState()

     let { files} = payload
     let data = new FormData()
     data.append('files', files)
     
     
     fetch(`http://localhost:8000/api/users/pp`, {
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
                  user_id: auth.id,
                  token: auth.token,
                  user_pp: response.user_pp,
                  isAuth: auth.isAuth
                }
                console.log(newAuth.user_pp,1)
                localStorage.setItem('auth',JSON.stringify(newAuth))
                dispatch({type:SET_AUTH_LOGIN, payload:{ success: response.success, username:newAuth.username, role:newAuth.role , username:newAuth.username, id:newAuth.user_id, pp:newAuth.user_pp, token:newAuth.token}})
                dispatch({type: PP_UPLOAD, payload:response.success}) 
              }
              
             
     })
   }
  }
  