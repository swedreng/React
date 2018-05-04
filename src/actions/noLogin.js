
import {GET_POSTS,GET_COMMENT} from "../constants"
import axios from '../myfunctions/myinterceptor'
export function getNoLogin(payload) {
    return (dispatch, getState) => { 
      let { posts } = getState()
      return axios(`${process.env.URL}/api/postsdefault`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          postReq: payload.value,
          status: payload.event,
          filter: payload.filter
        })
        }).then(response => { 
          console.log('ccc')
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

  export function getComment(payload) {
    return (dispatch, getState) => { 
      let { auth } = getState()
      return axios(`${process.env.URL}/api/outgetcomment`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
           post_id: payload.post_id,
           clickCount: payload.clickCount
        })
        }).then(response => {
          if(response.data){
            const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
            dispatch({type:GET_COMMENT, payload:data})
          }
              
      })
    }
  }