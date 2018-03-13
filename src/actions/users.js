
import {GET_USERS,USER_DELETE,GETUSER_INFO, USERINFO_UPDATE,PERSONS, GET_POSTS,VİEW_PERSON} from "../constants"
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

 
    
  export function addStorageItemLogin(payload) {
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
      let { auth,posts } = getState() 
      
      return fetch(`${process.env.URL}/api/loginsearch`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
          })
        
        }).then(response => response.json()).then(response => {
          window.location = "#/loginsearch"
          if(response.data){
            if(response.event){
              var data = response.data
              var postCount = response.postCount
            }else{
              var data = posts.data.concat(response.data)
              var postCount = response.postCount
            }
             
          }else{
            var data = []
            var postCount = 0
          }
          
          dispatch({type: PERSONS, payload:response.Users})
          dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
    
  }

  export function addStorageItemNoLogin(payload) {
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
      let { auth,posts } = getState() 
      return fetch(`${process.env.URL}/api/nologinsearch`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
          })
        
        }).then(response => response.json()).then(response => {
          window.location = "#/search"
          console.log(response.Posts,response.event,2)
          if(response.data){
            if(response.event){
              var data = response.data
              var postCount = response.postCount
            }else{
              var data = posts.data.concat(response.data)
              var postCount = response.postCount
            }
             
          }else{
            var data = []
            var postCount = 0
          }
          
          dispatch({type: PERSONS, payload:response.Users})
          dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
    
  }

  export function LoginviewProfile(payload) {
    
      return (dispatch, getState) => { 
        let { auth } = getState() 
        
        return fetch(`${process.env.URL}/api/loginviewprofile`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          body: JSON.stringify({
            person_id: payload.person_id,
            postReq: payload.value,
            event: payload.event
            })
          
          }).then(response => response.json()).then(response => {
            window.location = "#/loginviewprofile"
            console.log(response.Posts,response.event,2)
            if(response.data){
              if(payload.event){
                var data = response.data
                var postCount = response.postCount
              }else{
                var data = posts.data.concat(response.data)
                var postCount = response.postCount
              }
               
            }else{
              var data = []
              var postCount = 0
            }
            dispatch({type: VİEW_PERSON, payload:response.Users})
            dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
        })
      }
    }
  

    export function viewProfile(payload) {
      
        return (dispatch, getState) => { 
          let { auth,posts } = getState() 
          
          return fetch(`${process.env.URL}/api/viewprofile`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              person_id: payload.person_id,
              postReq: payload.value,
              event: payload.event
              })
            
            }).then(response => response.json()).then(response => {
              if(payload.event == true){
                window.location = "#/viewprofile"
              }
              
              console.log(response.Posts,response.event,2)
              if(response.data){
                if(payload.event){
                  var data = response.data
                  var postCount = response.postCount
                }else{
                  var data = posts.data.concat(response.data)
                  var postCount = response.postCount
                }
                 
              }else{
                var data = []
                var postCount = 0
              }
              if(payload.event == true){
                dispatch({type: VİEW_PERSON, payload:response.Users})
              }
              dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
          })
        }
      }


    export function emptyPerson() {
      return (dispatch, getState) => { 
      dispatch({type: VİEW_PERSON, payload:[]})
      }
    }
  
