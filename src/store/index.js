import { createStore, applyMiddleware, compose } from "redux"

import rootReducer from "../reducer"   

const composeEnhancers =
process.env.NODE_ENV != "production"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

export default createStore(rootReducer, undefined, composeEnhancers())