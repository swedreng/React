import { GET_USERS, USER_DELETE, GETUSER_INFO } from "../constants"

const users = {
  data: [],
  user_info:null
}

export default (state = users, action) => {
 switch (action.type) {
    case GET_USERS:
      const  users  = action.payload
     return { 
       ...state,
       data: users }
      break
    case GETUSER_INFO:
      
      return { ...state,
        user_info: action.payload }
   default:
     return state
  }
}