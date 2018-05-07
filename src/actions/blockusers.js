import {PERSONS} from "../constants"
import {alertMessage} from "./desc"
import axios from '../myfunctions/myinterceptor'
export function getBlockUsers(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return axios(`${process.env.URL}/api/user/blockusers`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        data: JSON.stringify({
          postReq: payload.value,
          event: payload.event
          })
        
        }).then(response => {
          if(response.banned_persons){
            if(payload.event){
              var data = response.banned_persons
              var userCount = response.user_count
            }else{
              var data = persons.persons.concat(response.banned_persons)
              var userCount = response.user_count
            }
             
          }else{
            var data = []
            var userCount = 0
          }
        dispatch({type: PERSONS, payload:{data:data, persons_count:userCount}})
      })
    }
  }

  export function notBlockUser(payload) {
    return (dispatch, getState) => {    
      let { auth, posts, persons} = getState()
      return axios(`${process.env.URL}/api/user/notblockuser`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        data: JSON.stringify({
          person_id: payload.person_id
          })
        
        }).then(response => {
          const index = persons.persons.findIndex(person => person.id == payload.person_id)
          if(index == 0){
            persons.persons.shift()
          }else{
            persons.persons.splice(index,1)
          }  
        dispatch({type: PERSONS, payload:{data:persons.persons, persons_count:response.user_count}})
      })
    }
  }
  