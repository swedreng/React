import {GET_POSTS} from "../constants"
import {alertMessage} from "./desc"
export function getPosts() {
  return (dispatch, getState) => { 

    fetch(`http://localhost:8000/api/posts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      
      }).then(response => response.json()).then(response => {
         dispatch({type: GET_POSTS, payload:response})
    })
  }
}