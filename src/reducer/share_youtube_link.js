import { SHARE_YOUTUBE } from "../constants"
const defaultState = {
    result: null
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
      case SHARE_YOUTUBE:
        return { ...state, result: action.payload }
        break
      default:
        return state
    }
}