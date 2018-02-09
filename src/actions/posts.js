import {GET_POSTS,POST_LIKE,COMMENT_UPDATE,COMMENT_LIKE} from "../constants"
import {alertMessage} from "./desc"
import {commentUpdate} from "./commentupdate"
import {commentLastUpdate} from "./commentLastUpdate"

export function getPosts(payload) {
  return (dispatch, getState) => { 
    let { auth, posts } = getState()
    return fetch(`${process.env.URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
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

export function comment(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    return fetch(`${process.env.URL}/api/comment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          writing: payload.comment,
          postpicture_id: payload.post_id,
          commentCount:payload.commentCount
      })
      }).then(response => response.json()).then(response => {
          const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
          dispatch({type:COMMENT_UPDATE, payload:data})
          dispatch(commentUpdate(payload.post_id))
         
    })
  }
}

export function postLike(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/postlike`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          like:payload.like,
          post_id:payload.post_id,
          like_kind:'post'
      })
      }).then(response => response.json()).then(response => {
        const data = {post_id:payload.post_id,result:response.result,likeCount:response.likeCount}
        dispatch({type:POST_LIKE, payload:data})
    })
  }
}

export function commentLike(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/comment`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          comment_id: payload.comment_id,
          post_id: payload.post_id,
          like_kind:'comment'
      })
      }).then(response => response.json()).then(response => {
            const commentUpdateData = {commentCount:payload.commentCount,post_id:payload.post_id}
            const data = {post_id:payload.post_id,result:response.result,likeCount:response.likeCount,comment_id:payload.comment_id}
            dispatch({type:COMMENT_LIKE, payload:data})
            dispatch(commentLastUpdate(commentUpdateData))
            dispatch(commentUpdate(payload.post_id))
            
    })
  }
}

export function getComment(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/getcomment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
         value:payload.value,
         post_id: payload.post_id
      })
      }).then(response => response.json()).then(response => {
            const data = {post_id:payload.post_id,data:response.data,value:payload.value,commentCount:response.commentCount}
            dispatch({type:COMMENT_UPDATE, payload:data})
    })
  }
}

