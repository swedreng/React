
import {GET_USERS} from "../constants"
export function getUsers() {
  return (dispatch, getState, api) => { 
    
    //let { user } = getState()
    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      }).then(response => response.json()).then(response => {
        console.log(response)
         dispatch({type: GET_USERS, payload:response})
    })
  }
  
}

