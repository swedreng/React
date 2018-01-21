import { USER_SIGNUP } from "../constants"

const defaultState = {
  result: null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case USER_SIGNUP:
     const  result  = action.payload.result
     return {result} 
      break
   default:
     return state
  }
}