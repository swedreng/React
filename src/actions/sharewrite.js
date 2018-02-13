import {GET_POSTS,SHARE_WRITE} from "../constants"
import {alertMessage} from "./desc"

export function shareWrite(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return fetch(`${process.env.URL}/api/user/createwp`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
            write:payload.write
        })
        }).then(response => response.json()).then(response => {
            
            const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
            dispatch({type: SHARE_WRITE, payload:response.success})
            dispatch(alertMessage({message:response.message}))
           
      })
    }
  }