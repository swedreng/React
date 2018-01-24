
import {GET_USERS,USER_DELETE,GETUSER_INFO, USERINFO_UPDATE} from "../constants"
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      }).then(response => response.json()).then(response => {
        return dispatch(alertMessage({ success: response.success, message:response.message}))   
    })
  }
}
export function getUsersInfo() {

  return (dispatch, getState) => { 
    let user_id = localStorage.getItem("user_id");
    console.log(user_id)
    return fetch(`http://localhost:8000/api/users/userinfo/${user_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      }).then(response => response.json()).then(response => {
        console.log(response)
         dispatch({type: GETUSER_INFO, payload:response})
    })
  }
}
export function getuserinfoUpdate(payload) {
  
    return (dispatch, getState) => { 
      let user_id = localStorage.getItem("user_id");
      console.log(user_id)
      return fetch(`http://localhost:8000/api/users/userinfoupdate`, {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')} `
        },
        body: JSON.stringify({
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          email: payload.email,
          user_id:user_id
          })
        
        }).then(response => response.json()).then(response => {
          console.log(response)
           dispatch(alertMessage({message:response.message}))
           dispatch({type: USERINFO_UPDATE, payload:response.success})
      })
    }
  }

