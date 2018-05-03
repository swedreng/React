import {GET_USERS,USER_DELETE,GETUSER_INFO, USERINFO_UPDATE} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function getContact(payload) {
 
  return (dispatch, getState, api) => { 
      console.log(payload,55)
    return axios(`${process.env.URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        choose: payload.choose 
    })
      }).then(response => response.json()).then(response => {
        dispatch(alertMessage({message:response.message,result:response.result}))
    })
  }
}