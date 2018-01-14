import { combineReducers } from "redux"

import auth from "./auth" 
import user from "./user" 
import description from "./description" 
import users from "./users" 


const appReducer = combineReducers({  
    auth,
    user,
    description,
    users
})

export default appReducer