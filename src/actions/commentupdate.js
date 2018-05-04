import {COMMENT_BEST} from "../constants"
import axios from '../myfunctions/myinterceptor'

export function commentUpdate(payload) {
    return (dispatch, getState) => { 
      let { auth } = getState()
    axios(`${process.env.URL}/api/comment?post_id=${payload}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
       
        }).then(response => {
          const data = {post_id:payload,comments:response.CommentBest}
           dispatch({type: COMMENT_BEST , payload:data})
      })
    }
  }

