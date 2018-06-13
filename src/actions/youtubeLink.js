import { GET_POSTS, SHARE_YOUTUBE } from '../constants'
import { alertMessage } from "./desc"
import axios from '../myfunctions/myinterceptor'
export function youtubeLink(payload) {
    return (dispatch, getState) => {
        let { auth, posts } = getState()
        return axios(`${process.env.URL}/api/user/createyoutubelink`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token} `
          },
          data: JSON.stringify({
            write: payload.write,
            link: payload.link
          })
        })
          .then(response => {
            dispatch(alertMessage({ message: response.message }))
            dispatch({ type: SHARE_YOUTUBE, payload: response.success })
          })
          .catch(error => {
            dispatch(alertMessage({
                message: error.response.data.message
              }))
            dispatch({
              type: SHARE_YOUTUBE,
              payload: error.response.data.success
            })
          })
    }
}