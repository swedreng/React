import { GET_POSTS, SHARE_LINK } from '../constants'
import { alertMessage } from "./desc"
import axios from '../myfunctions/myinterceptor'
export function shareLink(payload) {
    return (dispatch, getState) => {
        let { auth, posts } = getState()
        return axios(`${process.env.URL}/api/user/createlink`, {
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
            dispatch({ type: SHARE_LINK, payload: response.success })
          })
          .catch(error => {
            dispatch(alertMessage({
                message: error.response.data.message
              }))
            dispatch({
              type: SHARE_LINK,
              payload: error.response.data.success
            })
          })
    }
}