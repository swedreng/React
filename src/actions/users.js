import axios from '../myfunctions/myinterceptor'
import {GET_USERS,USER_DELETE,GETUSER_INFO, USERINFO_UPDATE,PERSONS, GET_POSTS,VIEW_PERSON,GETUSER_SHARE_INFO} from "../constants"
import {alertMessage} from "./desc"
import { push } from 'react-router-redux'
export function getUsers(payload) {
  return (dispatch, getState, api) => { 
    let { auth } = getState()
    axios(`${process.env.URL}/api/users?page=${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      
      }).then(response => {
        console.log(response)
         dispatch({type: GET_USERS, payload:response})
    })
  }
}

export function deleteUser(payload) { 
  
  return (dispatch, getState, api) => { 
    let { auth } = getState()
    let user_id = payload.user_id
    
     return axios(`${process.env.URL}/api/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      }).then(response => {
        return dispatch(alertMessage({ success: response.success, message:response.message}))   
    })
  }
}
export function getUsersInfo() {

  return (dispatch, getState) => { 
    let { auth } = getState()
  
    return axios(`${process.env.URL}/api/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      }).then(response => {
        console.log(response)
         dispatch({type: GETUSER_INFO, payload:response.user_info})
         dispatch({type: GETUSER_SHARE_INFO, payload:{postCount:response.postCount,commentCount:response.commentCount}})
    })
  }
}
export function getuserinfoUpdate(payload) {
  
    return (dispatch, getState) => { 
      let { auth, users } = getState() 
      
      return axios(`${process.env.URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        
        data: JSON.stringify({
          value: payload.value,
          status: payload.status
        })
        
        }).then(response => {
          if(response.status == 1){
            var user_info = users.user_info
            user_info.firstname = payload.value
            dispatch({type: GETUSER_INFO, payload:user_info}) 
          }else{
            var user_info = users.user_info
            user_info.lastname = payload.value
            dispatch({type: GETUSER_INFO, payload:user_info}) 
          }
          
          dispatch(alertMessage({message:response.message}))
          dispatch({type: USERINFO_UPDATE, payload:response.success})
          
      })
    }
  }

  export function getUserEmailUpdate(payload) {
    
      return (dispatch, getState) => { 
        let { auth, users} = getState() 
        
        return axios(`${process.env.URL}/api/user/emailupdate`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            email: payload.email
          })
          }).then(response => {
            var user_info = users.user_info
            user_info.email = payload.email
            dispatch({type: GETUSER_INFO, payload:user_info}) 
            dispatch(alertMessage({message:response.message}))
            dispatch({type: USERINFO_UPDATE, payload:response.success})
        })
      }
  }

  export function getUsernameUpdate(payload) {
    
      return (dispatch, getState) => { 
        let { auth, users } = getState() 
        
        return axios(`${process.env.URL}/api/user/usernameupdate`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            username: payload.username
          })
          }).then(response => {
            var user_info = users.user_info
            user_info.username = payload.username
            dispatch({type: GETUSER_INFO, payload:user_info}) 
            dispatch(alertMessage({message:response.message}))
            dispatch({type: USERINFO_UPDATE, payload:response.success})
        })
      }
  }

  export function userPasswordUpdate(payload) {
    
      return (dispatch, getState) => { 
        let { auth } = getState() 
        
        return axios(`${process.env.URL}/api/user/passwordupdate`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            oldpassword: payload.oldpassword,
            newpassword: payload.newpassword
          })
          }).then(response => {
            
             dispatch(alertMessage({message:response.message}))
             dispatch({type: USERINFO_UPDATE, payload:response.success})
        })
      }
    }

 
    
  export function addStorageItemLogin(payload) {
    console.log("gelgel")
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
      
      return axios(`${process.env.URL}/api/loginsearch`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        data: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
          })
        
        }).then(response => {
          dispatch(push(`/loginsearch/${payload.search}`))
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
      return axios(`${process.env.URL}/api/nologinsearch`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
          })
        
        }).then(response => {
          dispatch(push(`/search/${payload.search}`))
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
          dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
      })
    }
    
  }
  
  export function SearchPerson(payload) {
    console.log(payload,67)
      return (dispatch, getState) => { 
        let { auth,posts,persons } = getState() 
        
        return axios(`${process.env.URL}/api/searchperson`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
            })
          
          }).then(response => {
            if(response.Users){
              if(payload.event){
                var data = response.Users
                var userCount = response.userCount
              }else{
                var data = persons.persons.concat(response.Users)
                var userCount = response.userCount
              }
               
            }else{
              var data = []
              var userCount = 0
            }
          dispatch({type: PERSONS, payload:{data:data, persons_count:userCount}})
        })
      }
    }

  export function LoginSearchPerson(payload) {
    console.log(payload,67)
      return (dispatch, getState) => { 
        let { auth,posts,persons } = getState() 
        
        return axios(`${process.env.URL}/api/loginsearchperson`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            search: payload.search,
            postReq: payload.value,
            event: payload.event
            })
          
          }).then(response => {
            if(response.Users){
              if(payload.event){
                var data = response.Users
                var userCount = response.userCount
              }else{
                var data = persons.persons.concat(response.Users)
                var userCount = response.userCount
              }
               
            }else{
              var data = []
              var userCount = 0
            }
          dispatch({type: PERSONS, payload:{data:data, persons_count:userCount}})
        })
      }
    }
  




  export function LoginviewProfile(payload) {
    console.log(payload,67)
      return (dispatch, getState) => { 
        let { auth,posts } = getState() 
        
        return axios(`${process.env.URL}/api/loginviewprofile`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            person_username: payload.person_username,
            postReq: payload.value,
            event: payload.event
            })
          
          }).then(response => {
            if(payload.event){
              dispatch(push(`/loginviewprofile/user/${response.username}`))
            }
            
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
            dispatch({type: VIEW_PERSON, payload:{user:response.Users,postCount:response.postCount,commentCount:response.commentCount}}) 
            dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
            
        })
      }
    }
  

    export function viewProfile(payload) {
      console.log(2344)
        return (dispatch, getState) => { 
          let { auth,posts } = getState() 
          
          return axios(`${process.env.URL}/api/viewprofile`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              person_username: payload.person_username,
              postReq: payload.value,
              event: payload.event
              })
            
            }).then(response => {
              if(payload.event == true){
                dispatch(push(`/viewprofile/user/${response.username}`))
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
              dispatch({type: VIEW_PERSON, payload:{user:response.Users,postCount:response.postCount,commentCount:response.commentCount}}) 
              dispatch({type:GET_POSTS, payload:{data:data,postCount:postCount}})
          })
        }
      }

  
