import {COMMENTLAST_UPDATE} from "../constants"
export function commentLastUpdate(payload) {
    return (dispatch, getState) => { 
      let { auth } = getState()
    fetch(`${process.env.URL}/api/commentlast?post_id=${payload.post_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token} `
        },
        body: JSON.stringify({
          commentCount:payload.commentCount
      })
        }).then(response => response.json()).then(response => {
          const data = {post_id:payload.post_id,comments:response}
          console.log(response,3)
           dispatch({type: COMMENTLAST_UPDATE , payload:data})
      })
    }
  }
