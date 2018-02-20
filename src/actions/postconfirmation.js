import {GET_POSTS,POST_LIKE,COMMENT_UPDATE,COMMENT_LIKE,GET_COMMENT} from "../constants"
export function postConfirmationUpdate(payload) {
    return (dispatch, getState) => {    
      let { auth, posts} = getState()
      return fetch(`${process.env.URL}/api/post/confirmationupdate`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
            post_id: payload.post_id, 
        })
        }).then(response => response.json()).then(response => {
            if(response.result){
                posts.data.map(post =>{
                    if(post.post_id == payload.post_id){
                        post.confirmation = true
                    }
                })
                dispatch({type:GET_POSTS, payload:posts})
            }   
          
      })
    }
  }