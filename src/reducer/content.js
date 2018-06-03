import { SET_CONTENT, SET_CONTENTDETAIL } from "../constants"

const defaultState = {
  contents: [],
  contentCount: null,
  contentdetail:null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case SET_CONTENT:
        return {...state, contents:action.payload.data, contentCount:action.payload.contentCount}
      break
    case SET_CONTENTDETAIL:
      return {...state, contentdetail:action.payload}
    break
   default:
     return state
  }
}