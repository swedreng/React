import {GET_POSTS,POST_LIKE,COMMENT_UPDATE, COMMENT_LIKE,COMMENT_BEST, COMMENTLAST_UPDATE,GET_COMMENT, PP_UPLOAD} from "../constants"
import { LOCATION_CHANGE } from 'react-router-redux'
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
            if(post.post_id == action.payload.post_id){
                  var data = post.CommentLast.concat(action.payload.data)
                  post.CommentLast = data
                  post.CommentCount = action.payload.commentCount
            }
            return post
      })
    }
      break  

    case GET_COMMENT:
      return {...state, data:state.data.map(post =>{
            if(post.post_id == action.payload.post_id){
                  var data = action.payload.data.concat(post.CommentLast)
                  post.CommentLast = data
                  
            }
            return post
      })
    }
      break   

    case COMMENT_LIKE:
      
      return {...state, data:state.data.map(post =>{
            if(post.post_id == action.payload.post_id){
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
            if(post.post_id == action.payload.post_id){
                  post.CommentBest = action.payload.comments
            }
            return post
      })
    }
      break  
    case COMMENTLAST_UPDATE:

      return {...state, data:state.data.map(post =>{
            if(post.post_id == action.payload.post_id){
                  post.CommentLast = action.payload.comments
            }
            return post
      })
    }
      break 

    case POST_LIKE:
    
      return {...state,data:state.data.map(post =>{
            if(post.post_id == action.payload.post_id){
                  post.IslikedPost = action.payload.result
                  post.like = action.payload.likeCount
                  
            }
            return post
          })
        }    
      break   
    case LOCATION_CHANGE:
      return defaulState
      default:
      return state
  }
}