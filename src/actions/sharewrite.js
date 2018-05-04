import {GET_POSTS,SHARE_WRITE} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function shareWrite(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/user/createwp`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
            write:payload.write
        })
        }).then(response => {
            
            const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
            dispatch({type: SHARE_WRITE, payload:response.success})
            dispatch(alertMessage({message:response.message}))
           
      })
    }
  }