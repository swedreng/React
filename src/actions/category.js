import {SET_CATEGORIES, SET_CONTENT,SET_CONTENTDETAIL} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function getCategory(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/post/getcategory`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       
        }).then(response => {
          dispatch({type:SET_CATEGORIES,payload:response})
      })
    }
  }
  export function getContent(payload) {
    return (dispatch, getState) => {    
      let { auth, contents} = getState()
      return axios(`${process.env.URL}/api/getcontent`, {
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
              var contentCount = response.contentCount
            }else{
              var data = contents.contents.concat(response.data)
              var contentCount = response.contentCount
            }
             
          }else{
            var data = []
            var contentCount = 0
          }

          dispatch({type:SET_CONTENT,payload:{data:data,contentCount:contentCount}})
      })
    }
  }
  export function getContentDetail(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/getcontentdetail`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          content_id: payload.content_id
        })
        }).then(response => {
          dispatch({type:SET_CONTENTDETAIL,payload:response})
      })
    }
  }