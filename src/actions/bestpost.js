import {SET_BESTPOSTS,SET_BESTPOST,GET_POSTS} from "../constants"
import {alertMessage} from "./desc"

export function getBestPostToday(){
    return (dispatch, getState) => {    
      return fetch(`${process.env.URL}/api/bestposttoday`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       
        }).then(response => response.json()).then(response => {
            dispatch({type: SET_BESTPOSTS, payload:response })
      })
    }
  }

export function getBestPost(payload){
    return (dispatch, getState) => {    
      return fetch(`${process.env.URL}/api/getbestpost`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: payload.post_id
        })
        }).then(response => response.json()).then(response => {
          console.log(response,31)
            var data = response
            var postCount = response.length
            dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
            //dispatch({type: SET_BESTPOST, payload:response })
      })
    }
  }  