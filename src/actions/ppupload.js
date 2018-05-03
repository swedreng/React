import {PP_UPLOAD,SET_AUTH_LOGIN} from "../constants"
import {getPosts} from "./posts"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function profilpictureUpload(payload) {
    
   return (dispatch, getState) => { 
     let { auth } = getState()

     let { files} = payload
     let data = new FormData()
     data.append('files', files)
     
     axios(`${process.env.URL}/api/user/pp`, {
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
                data = {user_id: auth.user_id,newUserpp:newAuth.user_pp}
                dispatch({type:SET_AUTH_LOGIN, payload:{ success: response.success, username:newAuth.username, role:newAuth.role , username:newAuth.username, user_id:newAuth.user_id, pp:newAuth.user_pp, token:newAuth.token}})
                dispatch(getPosts({value:0,event:true})) 
              }
     })
   }
  }
  