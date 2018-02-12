
import {GET_POSTS,POST_LIKE,COMMENT_UPDATE,COMMENT_LIKE,GET_COMMENT} from "../constants"

export function getNoLogin(payload) {
    return (dispatch, getState) => { 
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

          var data = response.data
          var postCount = response.postCount
  
          dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
  }