import { GET_USERS, USER_DELETE, GETUSER_INFO, USERINFO_UPDATE } from "../constants"

const users = {
  Users: [],
  user_info:null,
  result:null
}

export default (state = users, action) => {
 switch (action.type) {
    case GET_USERS:
      const  users  = action.payload
      console.log(users,2)
     return { 
       ...state,
       Users: users }
      break
    case GETUSER_INFO:
      
      return { ...state,
        user_info: action.payload }
      break
    case USERINFO_UPDATE:
      return { ...state,
        result: action.payload }
      break  
   default:
     return state
  }
}