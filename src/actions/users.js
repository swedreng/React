
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


  export function getSearchItem(payload) {
    
    const result = localStorage.getItem('search')
    if(result){
      const search = localStorage.getItem('search')
      function pushSearch(userSearch){
        search.push(userSearch)
        localStorage.setItem('search',JSON.stringify(search))
      }
      console.log(search,444)
      if(search.length < 1){ // search.lenght deyince karakter sayısı dönüyor buna bak 9 dönüyor
        search.map(data => {
          console.log(data,3)
          if(data == payload.search){
            
          }else{
            pushSearch(payload.search)
          }
          return search
        })
      }else{
        
        search.push(payload.search)
        localStorage.setItem('search',JSON.stringify(search))
      }
      
    }else{
      var search = []
      search.push(payload.search)
      localStorage.setItem('search',JSON.stringify(search))
    }
    
    
    
  
  }
  
