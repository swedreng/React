import { resetLogin } from '../actions/auth'

const ErrorTracker = ({ dispatch, getState }) => next => async action => {
  try {
    const result = await next(action)
    return result
  } catch (error) {
    if (error.status && error.status === 401) {
      dispatch(resetLogin())
    } 

    return error
  }
}

export { ErrorTracker }