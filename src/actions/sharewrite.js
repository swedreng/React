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
      
            dispatch(alertMessage({message:response.message}))
            dispatch({type: SHARE_WRITE, payload:response.success})
        }).catch(error => {
            dispatch(alertMessage({message:error.response.data.message}))
            dispatch({type: SHARE_WRITE, payload:error.response.data.success})
        })
    }
  }