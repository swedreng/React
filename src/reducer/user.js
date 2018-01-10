import { SET_USER } from "../constants"

const defaultState = {
  firstname:"",
  lastname:"",  
  username: "",
  password: "",
  email: "",
  user_group_id: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      const { firstname,lastname,username, password, email, user_group_id } = action.payload
      return { firstname,lastname,username, password, email, user_group_id }
      break
    default:
      return state
  }
}