import { GET_USERS } from "../constants"

const users = {}

export default (state = users, action) => {
 switch (action.type) {
    case GET_USERS:
     const  users  = action.payload
     return {users} 
      break
   default:
     return state
  }
}