import { FILE_UPLOAD , PP_UPLOAD } from "../constants"
const defaultState = {
  result:null,
  pp_result:null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        result:action.payload
      }
      break
      case PP_UPLOAD:
      console.log(action.payload,9)
      const image = (action.payload !== null ? `${process.env.URL}${action.payload}` : null)
      console.log(image,7)
      return {
        ...state,
        pp_result:image
      }
      break
    default:
      return state
  }
}