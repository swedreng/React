import {GET_POSTS} from "../constants"


export function commentUpdate(payload) {
    return (dispatch, getState) => { 
      let { auth } = getState()
    fetch(`${process.env.URL}/api/comment?post_id=${payload}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
       
        }).then(response => response.json()).then(response => {
          let { posts } = getState()
            let data = posts.data.map(post => {
                if(post.postpicture_id == payload){
                    post = response
                }                
                return post
            })
           dispatch({type: GET_POSTS , payload:data})
      })
    }
  }

