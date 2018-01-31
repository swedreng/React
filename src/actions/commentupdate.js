import {GET_POSTS} from "../constants"


export function commentUpdate(payload) {
    return (dispatch, getState) => { 
        let { posts } =getState()
      let { auth } = getState()
      fetch(`http://localhost:8000/api/comment?post_id=${payload}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
       
        }).then(response => response.json()).then(response => {
            posts = posts.map(posts => {
                if(posts.postpicture_id == payload){
                    posts.comments = response
                }
                return posts
            })
            console.log(response)
           dispatch({type: GET_POSTS, payload:posts})
      })
    }
  }