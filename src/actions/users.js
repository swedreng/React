
import {GET_USERS,USER_DELETE,GETUSER_INFO, USERINFO_UPDATE} from "../constants"
import {alertMessage} from "./desc"
export function getUsers(payload) {
  return (dispatch, getState, api) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/users?page=${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      
      }).then(response => response.json()).then(response => {
        console.log(response)
         dispatch({type: GET_USERS, payload:response})
    })
  }
}

export function deleteUser(payload) { 
  
  return (dispatch, getState, api) => { 
    let { auth } = getState()
    let user_id = payload.user_id
    
     return fetch(`${process.env.URL}/api/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      }).then(response => response.json()).then(response => {
        return dispatch(alertMessage({ success: response.success, message:response.message}))   
    })
  }
}
export function getUsersInfo() {

  return (dispatch, getState) => { 
    let { auth } = getState()
  
    return fetch(`${process.env.URL}/api/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      }).then(response => response.json()).then(response => {
        console.log(response)
         dispatch({type: GETUSER_INFO, payload:response})
    })
  }
}
export function getuserinfoUpdate(payload) {
  
    return (dispatch, getState) => { 
      let { auth } = getState() 
      
      return fetch(`${process.env.URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          email: payload.email
          })
        
        }).then(response => response.json()).then(response => {
          console.log(response)
           dispatch(alertMessage({message:response.message}))
           dispatch({type: USERINFO_UPDATE, payload:response.success})
      })
    }
  }

  function getSearchItem(payload) {
    console.log(payload,2)
      return (dispatch, getState) => { 
        let { auth } = getState() 
        
        return fetch(`${process.env.URL}/api/search`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              search: payload.search
            })
          
          }).then(response => response.json()).then(response => {
            
        })
      }
    }

  export function addStorageItem(payload) {
    var result = JSON.parse(localStorage.getItem('search'))
    if(result){
      const search = JSON.parse(localStorage.getItem('search'))
        var result = search.filter((search,index) => search == payload.search)
        if(result.length > 0){
          localStorage.setItem('search',JSON.stringify(search))
        }else{
          search.push(payload.search)
          localStorage.setItem('search',JSON.stringify(search))
        }
    }else{
      var search = []
      search.push(payload.search)
      localStorage.setItem('search',JSON.stringify(search))
    }
    
    return (dispatch, getState) => { 
      let { auth } = getState() 
      
      return fetch(`${process.env.URL}/api/search`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            search: payload.search
          })
        
        }).then(response => response.json()).then(response => {
          
      })
    }
    
  }
  
