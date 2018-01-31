import {GET_POSTS} from "../constants"
import {alertMessage} from "./desc"
import {commentUpdate} from "./commentupdate"
export function getPosts() {
  return (dispatch, getState) => { 

    fetch(`http://localhost:8000/api/posts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      
      }).then(response => response.json()).then(response => {
         
         dispatch({type: GET_POSTS, payload:response})
    })
  }
}

export function comment(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`http://localhost:8000/api/comment`, {
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
          console.log(response.post_id,99)
          dispatch(commentUpdate(response.post_id))
         
    })
  }
}

