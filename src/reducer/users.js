import { GET_USERS, USER_DELETE } from "../constants"

const users = {
  data: []
}

export default (state = users, action) => {
 switch (action.type) {
    case GET_USERS:
      const  users  = action.payload
     return { data: users }
      break
    
   default:
     return state
  }
}