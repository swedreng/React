import { GET_POSTS,POST_LIKE,COMMENT_UPDATE} from "../constants"

const defaulState = {
  data: [],
}

export default (state = defaulState, action = {}) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, data:action.payload}
      break
    case COMMENT_UPDATE:
      console.log(action.payload,111)
      return {...state, data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.CommentLast = action.payload.data
                  post.CommentCount = action.payload.data.length
            }

            return post
      })
    }
      break  
    case POST_LIKE:
      console.log(action.payload,11)
      return {...state, postlike:action.payload}
      break  
    default:
      return state
  }
}