import {GET_USER_POSTS,} from "../constants"
export function getUserPosts(payload) {
  return (dispatch, getState) => { 
    let { auth, posts } = getState()
    return fetch(`${process.env.URL}/api/userposts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      }).then(response => response.json()).then(response => { 
        dispatch({type:GET_USER_POSTS,payload:response})
    })
  }
}