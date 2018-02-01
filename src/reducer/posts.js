import { GET_POSTS} from "../constants"
import {POST_LIKE} from "../constants"
const defaulState = {
  data: [],
}

export default (state = defaulState, action = {}) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, data:action.payload}
      break
    case POST_LIKE:
      console.log(action.payload,11)
      return {...state, postlike:action.payload}
      break  
    default:
      return state
  }
}