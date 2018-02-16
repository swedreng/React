import {GET_POSTS,POST_LIKE,COMMENT_UPDATE,COMMENT_LIKE,GET_COMMENT} from "../constants"
import {alertMessage} from "./desc"
import {commentUpdate} from "./commentupdate"
import {commentLastUpdate} from "./commentLastUpdate"

export function getPosts(payload) {
  return (dispatch, getState) => { 
    let { auth, posts } = getState()
    return fetch(`${process.env.URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
        postReq: payload.value,
        status: payload.event
      })
      }).then(response => response.json()).then(response => { 

        if(response.data){
          if(response.event){
            var data = response.data
            var postCount = response.postCount
          }else{
            var data = posts.data.concat(response.data)
            var postCount = response.postCount
          }
           
        }else{
          var data = []
          var postCount = 0
        }
        dispatch({type: GET_POSTS, payload:{data:data,postCount:postCount}})
    })
  }
}


export function comment(payload) {
  return (dispatch, getState) => {    
    let { auth, posts} = getState()
    return fetch(`${process.env.URL}/api/comment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          writing: payload.comment,
          post_id: payload.post_id,
          commentCount:payload.commentCount
      })
      }).then(response => response.json()).then(response => {
          
          const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
          dispatch({type:COMMENT_UPDATE, payload:data})
          dispatch(commentUpdate(payload.post_id))
         
    })
  }
}

export function postLike(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/postlike`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          like:payload.like,
          post_id:payload.post_id,
          like_kind:'post'
      })
      }).then(response => response.json()).then(response => {
        const data = {post_id:payload.post_id,result:response.result,likeCount:response.likeCount}
        dispatch({type:POST_LIKE, payload:data})
    })
  }
}

export function commentLike(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    fetch(`${process.env.URL}/api/comment`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          comment_id: payload.comment_id,
          post_id: payload.post_id,
          like_kind:'comment'
      })
      }).then(response => response.json()).then(response => {
            const commentUpdateData = {commentCount:payload.commentCount,post_id:payload.post_id}
            const data = {post_id:payload.post_id,result:response.result,likeCount:response.likeCount,comment_id:payload.comment_id}
            dispatch({type:COMMENT_LIKE, payload:data})
            //dispatch(commentLastUpdate(commentUpdateData))
            dispatch(commentUpdate(payload.post_id))
            
    })
  }
}

export function getComment(payload) {
  return (dispatch, getState) => { 
    let { auth } = getState()
    return fetch(`${process.env.URL}/api/getcomment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
         value:payload.value,
         post_id: payload.post_id,
         clickCount: payload.clickCount
      })
      }).then(response => response.json()).then(response => {
        if(response.data){
          const data = {post_id:payload.post_id,data:response.data,commentCount:response.commentCount}
          dispatch({type:GET_COMMENT, payload:data})
        }
            
    })
  }
}

export function deletePost(payload) {
  
  return (dispatch, getState) => { 
    let { auth,posts } = getState()
    return fetch(`${process.env.URL}/api/user/deletepost`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
        post_id:payload.post_id
      })
      }).then(response => response.json()).then(response => {
        console.log(posts.data,34)

        if(response.result){

          function deletePost(index){
            if(index == 0){
              return posts.data.shift()
            }

            return posts.data.splice(index,1)
          }

          posts.data.map((post,index) => {

              if(post.post_id == payload.post_id){
                  deletePost(index)
              }
              return post
        })
          
          dispatch({type: GET_POSTS, payload:{data:posts.data,postCount:response.postCount}})
        }
            
      })
    }
}


export function deleteComment(payload) {
  
  return (dispatch, getState) => { 
    let { auth,posts } = getState()
    return fetch(`${process.env.URL}/api/user/deletecomment`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
        comment_id:payload.comment_id,
        post_id:payload.post_id
      })
      }).then(response => response.json()).then(response => {

        if(response.result){

          posts.data.map((post,index) => {

              if(post.post_id == payload.post_id){
                
                function deleteComment(index){
                  if(index == 0){
                    post.CommentCount = response.commentCount
                    return post.CommentLast.shift()
                  }
                    post.CommentCount = response.commentCount
                    return post.CommentLast.splice(index,1)
                }
                    post.CommentLast.map((comment,index) => {
                      
                        if(comment.comment_id == payload.comment_id){
                          deleteComment(index)
                        }
                        return comment   
   
                    })
              }
              return post
        })
          
          dispatch({type: GET_POSTS, payload:{data:posts.data}})
          dispatch(commentUpdate(payload.post_id))
        }else{
          alert('Size ait olmayan bir gönderiyi silmeye çalışıyorsunuz..')
        }
          
            
      })
    }
}

export function commentSave(payload) {
  return (dispatch, getState) => {    
    let { auth, posts} = getState()
    return fetch(`${process.env.URL}/api/user/updatecomment`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token} `
      },
      body: JSON.stringify({
          comment: payload.comment,
          post_id: payload.post_id,
          comment_id:payload.comment_id
      })
      }).then(response => response.json()).then(response => {
          if(response.result){
              posts.data.map((post) => {
                  if(post.post_id == payload.post_id){
                      post.CommentLast.map((comment) => {
                          if(comment.comment_id == payload.comment_id){
                              comment.writing = payload.comment
                          }
                          return comment
                      })
                  }
                  return post
              })
              console.log(posts.data,2)
              dispatch({type:GET_POSTS, payload:{data:posts.data}})
              dispatch(commentUpdate(payload.post_id))
          }else{
            alert('Size ait olmayan bir gönderiyi düzenlemeye çalışıyorsunuz..')
          }  
    })
  }
}








