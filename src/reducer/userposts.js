import { GET_USER_POSTS } from "../constants"
const defaultState = {
  Userposts: {
      data: [],
      to:0
  }
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return {
        ...state,
        Userposts: {
            data: action.payload.data,
            to: action.payload.to
        }
      }
      break
    default:
      return state
  }
}