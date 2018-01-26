import {FILE_UPLOAD} from "../constants"
import {alertMessage} from "./desc"
export function fileUpload(payload) {
   
  return (dispatch, getState) => { 
    let { files,writing } = payload
    let { auth } = getState()
 

    let data = new FormData()

    data.append('files', files)
    data.append('writing', writing)
    data.append('id', parseInt(auth.user_id))
    
   return fetch(`http://localhost:8000/api/users/createpost`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body : data
      }).then(response => response.json()).then(response => {
            dispatch(alertMessage({message:response.message}))
            dispatch({type: FILE_UPLOAD, payload:response.success})
         
    })
  }
}

