import {FILE_UPLOAD} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function fileUpload(payload) {
   
  return (dispatch, getState) => { 
    let { files,writing } = payload
    let { auth } = getState()
 
    let data = new FormData()

    data.append('files', files)
    data.append('writing', writing)
    
   return axios(`${process.env.URL}/api/user/createpp`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      data : data
      }).then(response => {
            dispatch(alertMessage({message:response.message}))
            dispatch({type: FILE_UPLOAD, payload:response.success})
         
      }).catch(error => {
        dispatch(alertMessage({message:error.response.data.message}))
        dispatch({type: FILE_UPLOAD, payload:error.response.data.success})
      })
  }
}

