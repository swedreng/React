
import {GET_POSTS,GET_COMMENT} from "../constants"

export function getNoLogin(payload) {
    return (dispatch, getState) => { 
      let { posts } = getState()
      return fetch(`${process.env.URL}/api/postsdefault`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postReq: payload
        })
        }).then(response => response.json()).then(response => { 
          if(response.data){
            var data = posts.data.concat(response.data)
            var postCount = response.postCount
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
      return fetch(`${process.env.URL}/api/outgetcomment`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           post_id: payload.post_id,
           clickCount: payload.clickCount
        })
        }).then(response => response.json()).then(response => {
          if(response.data){
            const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
            dispatch({type:GET_COMMENT, payload:data})
          }
              
      })
    }
  }