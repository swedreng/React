import {GET_POSTS,POST_LIKE,COMMENT_UPDATE, COMMENT_LIKE,COMMENT_BEST, COMMENTLAST_UPDATE} from "../constants"

const defaulState = {
  data: [],
  postCount:0
}

export default (state = defaulState, action = {}) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, data:action.payload.data, postCount:action.payload.postCount}
      break
    case COMMENT_UPDATE:
      return {...state, data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.CommentLast = action.payload.data
                  post.CommentCount = action.payload.commentCount
            }
            return post
      })
    }
      break  

    case COMMENT_LIKE:
      
      return {...state, data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.CommentLast.map(comment => {
                    if(comment.comment_id == action.payload.comment_id){
                      comment.IsLikedComment = action.payload.result
                      comment.like = action.payload.likeCount
                  }
                  return comment
                  })   
            }
            return post
      })
    }
      break 

    case COMMENT_BEST:

      return {...state, data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.CommentBest = action.payload.comments
            }
            return post
      })
    }
      break  
    case COMMENTLAST_UPDATE:
      console.log(action.payload,32)
      return {...state, data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.CommentLast = action.payload.comments
            }
            return post
      })
    }
      break 


    case POST_LIKE:
      console.log(action.payload,33)
      return {...state,data:state.data.map(post =>{
            if(post.postpicture_id == action.payload.post_id){
                  post.IslikedPost = action.payload.result
                  post.like = action.payload.likeCount
                  
            }
            return post
          })
        }    
      break  
    default:
      return state
  }
}