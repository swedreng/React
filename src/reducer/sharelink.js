import { SHARE_LINK } from "../constants"
const defaultState = {
    result: null
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
      case SHARE_LINK:
        return { ...state, result: action.payload }
        break
      default:
        return state
    }
}