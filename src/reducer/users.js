import { GET_USERS, GETUSER_SOCIAL_INFO, GETUSER_INFO, USERINFO_UPDATE,GETUSER_SHARE_INFO } from "../constants"

const users = {
  Users: [],
  user_info:null,
  user_social_media:null,
  user_share_info:null,
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
    case GETUSER_SOCIAL_INFO:
      return { ...state,
        user_social_media: action.payload }
      break  
    case GETUSER_SHARE_INFO:
      return { ...state,
        user_share_info: action.payload }
      break    
    case USERINFO_UPDATE:
      return { ...state,
        result: action.payload }
      break  
   default:
     return state
  }
}