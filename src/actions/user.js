import {SET_USER} from "../constants"

export function signUp(payload) { 
  console.log(payload)
    return { type: SET_USER, payload }
  }