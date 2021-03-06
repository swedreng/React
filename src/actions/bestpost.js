import {SET_BESTPOSTS,SET_BESTPOST,GET_POSTS} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function getBestPostToday(){
    return (dispatch, getState) => {    
      return axios(`${process.env.URL}/api/bestposttoday`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
        },
       
        }).then(response => {
          dispatch({type: SET_BESTPOSTS, payload:response })    
      })
    }
  }

  export function getTopBestPostToday(payload){
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/topbestposttoday`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          value: payload.value,
          event: payload.event
        })
        }).then(response => {
          if(response.data){
            if(response.event){
              var data = response.data
              var postCount = response.postCount
            }else{
              var data = posts.data.concat(response.data)
              var postCount = response.postCount
            }
             
          }else{
            var data = []
            var postCount = 0
          }
          dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
  }

  export function getTopBestPostTodayLogin(payload){
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/topbestposttodaylogin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
          value: payload.value,
          event: payload.event
        })
        }).then(response => {
          if(response.data){
            if(response.event){
              var data = response.data
              var postCount = response.postCount
            }else{
              var data = posts.data.concat(response.data)
              var postCount = response.postCount
            }
             
          }else{
            var data = []
            var postCount = 0
          }
          dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
  }


export function getBestPost(payload){
    return (dispatch, getState) => {    
      return axios(`${process.env.URL}/api/getbestpost`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            post_id: payload.post_id
        })
        }).then(response => {
            var data = response
            var postCount = response.length
            dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
            //dispatch({type: SET_BESTPOST, payload:response })
      })
    }
  }  

  export function getBestPostLogin(payload){
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/logingetbestpost`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
            post_id: payload.post_id
        })
        }).then(response => {
            var data = response
            var postCount = response.length
            dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
            //dispatch({type: SET_BESTPOST, payload:response })
      })
    }
  }  
