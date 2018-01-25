import {  PP_UPLOAD } from "../constants"
const defaultState = {
  pp_result:null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
      case PP_UPLOAD:
      const image = (action.payload !== null ? `${process.env.URL}${action.payload}` : null)
      return {
        ...state,
        pp_result:image
      }
      break
    default:
      return state
  }
}