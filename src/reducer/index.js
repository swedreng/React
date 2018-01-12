import { combineReducers } from "redux"

import auth from "./auth" 
import user from "./user" 
import description from "./description" 

const appReducer = combineReducers({  
    auth,
    user,
    description
})

export default appReducer