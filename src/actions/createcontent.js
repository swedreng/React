import {FILE_UPLOAD} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function contentUpload(payload) {
   
  return (dispatch, getState) => { 
    let { title,files1,writing1,files2,writing2,files3,writing3,
                files4,writing4,files5,writing5,files6,writing6,
                files7,writing7,files8,writing8,files9,writing9,
                files10,writing10} = payload
    let { auth } = getState()

    let data = new FormData()
    data.append('title',title)
    data.append('files1', files1)
    data.append('writing1', writing1)
    data.append('files2', files2)
    data.append('writing2', writing2)
    data.append('files3', files3)
    data.append('writing3', writing3)
    data.append('files4', files4)
    data.append('writing4', writing4)
    data.append('files5', files5)
    data.append('writing5', writing5)
    data.append('files6', files6)
    data.append('writing6', writing6)
    data.append('files7', files7)
    data.append('writing7', writing7)
    data.append('files8', files8)
    data.append('writing8', writing8)
    data.append('files9', files9)
    data.append('writing9', writing9)
    data.append('files10', files10)
    data.append('writing10', writing10)
    console.log(data,55)
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
        dispatch(alertMessage({message:error.response.data.message}))
        dispatch({type: FILE_UPLOAD, payload:error.response.data.success})
      }) 
  } 
}

