import { PASSWORD_RESET } from "../constants"
import { PasswordReset } from "../actions/auth";

const defaultState = {
  password_token: null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case PASSWORD_RESET:
        return {...state, password_token:action.payload}
      break
   default:
     return state
  }
}