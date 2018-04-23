import {SET_CATEGORIES} from "../constants"
import {alertMessage} from "./desc"

export function getCategory(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return fetch(`${process.env.URL}/api/post/getcategory`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       
        }).then(response => response.json()).then(response => {
          dispatch({type:SET_CATEGORIES,payload:response})
      })
    }
  }