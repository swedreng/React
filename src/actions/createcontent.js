import {FILE_UPLOAD} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function contentUpload(payload) {
   
  return (dispatch, getState) => { 
    let { title, files} = payload
    let { auth } = getState()
    let data = new FormData()

    files.forEach(file => {
      console.log(file)
      data.append('files[]', file.file)
      data.append('desc[]', (file.desc ? file.desc : ''))
    });

    data.append('title', title)

     return axios(`${process.env.URL}/api/createcontent`, {
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
        console.log(error)
        dispatch(alertMessage({message:error.response.data.message}))
        dispatch({type: FILE_UPLOAD, payload:error.response.data.success})
      }) 
  } 
}

