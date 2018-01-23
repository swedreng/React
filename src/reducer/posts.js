import { GET_POSTS} from "../constants"
const defaulState = {
  data: []
}

export default (state = defaulState, action = {}) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, data:action.payload.map(post => ({...post, image:`${process.env.URL}${post.image}`}))}
      break
    default:
      return state
  }
}