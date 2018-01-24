import {FILE_UPLOAD,PP_UPLOAD} from "../constants"
import {alertMessage} from "./desc"
export function fileUpload(payload) {
   
  return (dispatch, getState) => { 
    let { files,writing } = payload
    let { auth } = getState()
 

    let data = new FormData()

    data.append('files', files)
    data.append('writing', writing)
    data.append('id', auth.id)
    
    fetch(`http://localhost:8000/api/users/createpost`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      body : data
      }).then(response => response.json()).then(response => {
            dispatch(alertMessage({message:response.message}))
            dispatch({type: FILE_UPLOAD, payload:response.success})
         
    })
  }
}

export function profilpictureUpload(payload) {
  
 return (dispatch, getState) => { 

   let { files} = payload
   let data = new FormData()
   data.append('files', files)
   
   
   fetch(`http://localhost:8000/api/users/pp`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')} `
     },
     body : data
     }).then(response => response.json()).then(response => {
           dispatch({type: PP_UPLOAD, payload:response.success})  
           dispatch(getpp())
   })
 }
}
export function getpp() {
  
 return (dispatch, getState) => { 

    return fetch(`http://localhost:8000/api/users/picture`, {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')} `
     },
     }).then(response => response.json()).then(response => {
       console.log(response.result,5)
           dispatch({type: PP_UPLOAD, payload:response.result})  
   })
 }
}