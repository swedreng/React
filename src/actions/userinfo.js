import {USERINFO_UPDATE,GETUSER_INFO,GETUSER_SOCIAL_INFO,VIEW_PERSON_SOCIAL_MEDIA,VIEW_PERSON_SHARE_INFO} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function setUserInfo(payload){
    return (dispatch, getState) => {    
      let { auth,users } = getState()
      return axios(`${process.env.URL}/api/user/setuserinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
            value: payload.value,
            status: payload.status
        })
        }).then(response => {
          if(response.status == 1){
            var user_info = users.user_info
            user_info.phone = payload.value
            dispatch({type: GETUSER_INFO, payload:user_info})
          }else if(response.status == 2){
            var user_info = users.user_info
            user_info.adress = payload.value
            dispatch({type: GETUSER_INFO, payload:user_info})
          }else{
            var user_info = users.user_info
            user_info.personalwriting = payload.value
            dispatch({type: GETUSER_INFO, payload:user_info})
          }
            
          dispatch(alertMessage({message:response.message}))
          dispatch({type: USERINFO_UPDATE, payload:response.success})
            
      })
    }
  }

  export function setSocialMedia(payload){
    return (dispatch, getState) => {    
      let { auth,users } = getState()
      return axios(`${process.env.URL}/api/user/setsocialmedia`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
            value: payload.value,
            status: payload.status
        })
        }).then(response => {
          if(response.status == 1){
            var user_social_media = users.user_social_media
            user_social_media.facebook = payload.value
            dispatch({type: GETUSER_SOCIAL_INFO, payload:user_social_media})
          }else if(response.status == 2){
            var user_social_media = users.user_social_media
            user_social_media.twitter = payload.value
            dispatch({type: GETUSER_SOCIAL_INFO, payload:user_social_media})
          }else{
            var user_social_media = users.user_social_media
            user_social_media.instagram = payload.value
            dispatch({type: GETUSER_SOCIAL_INFO, payload:user_social_media})
          }
            
          dispatch(alertMessage({message:response.message}))
          dispatch({type: USERINFO_UPDATE, payload:response.success})
            
      })
    }
  }

  export function getUserSocialMedia(payload){
    return (dispatch, getState) => {    
      let { auth,users } = getState()
      return axios(`${process.env.URL}/api/user/getsocialmedia`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
       
        }).then(response => {
          
          dispatch({type: GETUSER_SOCIAL_INFO, payload:response.data})
            
      })
    }
  }

  export function getUserViewSocialMedia(payload){
    console.log(payload,99)
    return (dispatch, getState) => {    
      let { auth,users } = getState()
      return axios(`${process.env.URL}/api/user/getviewsocialmedia`, {
        method: 'POST',
        headers: {  
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          person_username: payload.person_username
        })
        }).then(response => {
          console.log(response.data,73)
          dispatch({type: VIEW_PERSON_SOCIAL_MEDIA, payload:response.data})
            
      })
    }
  }


  export function getShareInfo(payload){
    return (dispatch, getState) => {    
      let { auth,users } = getState()
      return axios(`${process.env.URL}/api/user/getshareInfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
          person_username: payload.person_username
        })
        }).then(response => {
           dispatch({type: VIEW_PERSON_SHARE_INFO, payload:{commentCount:response.commentCount,postCount:response.postCount}})    
      })
    }
  }


 


