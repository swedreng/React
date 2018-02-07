import {GET_POSTS,POST_LIKE,COMMENT_UPDATE} from "../constants"


import {alertMessage} from "./desc"
import {commentUpdate} from "./commentupdate"
import {getUserComment} from "./getcomment"
export function getPosts() {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/posts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      
      }).then(response => response.json()).then(response => {
         dispatch({type: GET_POSTS, payload:response})
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
          postpicture_id: payload.post_id
      })
      }).then(response => response.json()).then(response => {
          console.log(response,88)
          const data = {post_id:payload.post_id,data:response}
          dispatch({type:COMMENT_UPDATE, payload:data})
         
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
            dispatch(commentUpdate(payload.post_id))
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
            const data = {post_id:payload.post_id,data:response,value:payload.value}
            dispatch({type:COMMENT_UPDATE, payload:data})
    })
  }
}

