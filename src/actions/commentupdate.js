import {COMMENT_BEST} from "../constants"


export function commentUpdate(payload) {
    return (dispatch, getState) => { 
      let { auth } = getState()
    fetch(`${process.env.URL}/api/comment?post_id=${payload}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
       
        }).then(response => response.json()).then(response => {
          const data = {post_id:payload,comments:response.CommentBest}
           dispatch({type: COMMENT_BEST , payload:data})
      })
    }
  }

