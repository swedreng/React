
import {GET_USERS,USER_DELETE} from "../constants"
import {alertMessage} from "./desc"
export function getUsers() {
  return (dispatch, getState, api) => { 

    fetch(`http://localhost:8000/api/users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      
      }).then(response => response.json()).then(response => {
        console.log(response)
         dispatch({type: GET_USERS, payload:response})
    })
  }
}

export function deleteUser(payload) { 
  
  return (dispatch, getState, api) => { 
    let user_id = payload.user_id
    console.log(user_id)
    //let { user } = getState()
     return fetch(`http://localhost:8000/api/users/delete/${user_id}`, {
      method: 'DELETE',
      }).then(response => response.json()).then(response => {
        return dispatch(alertMessage({ success: response.success, message:response.message}))   
    })
  }
}

