import { SET_USER } from "../constants"

const defaultState = {
  result: null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SET_USER:
     const  result  = action.payload.result
     return {result} 
      break
   default:
     return state
  }
}