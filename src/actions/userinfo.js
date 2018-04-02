import {USERINFO_UPDATE} from "../constants"
import {alertMessage} from "./desc"

export function setUserInfo(payload){
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return fetch(`${process.env.URL}/api/user/setuserinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
            value: payload.value,
            status: payload.status
            })
        }).then(response => response.json()).then(response => {
            dispatch(alertMessage({message:response.message}))
            dispatch({type: USERINFO_UPDATE, payload:response.success})
      })
    }
  }

