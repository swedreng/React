import { combineReducers } from "redux"

import auth from "./auth" 
import signup from "./signup" 
import description from "./description" 
import users from "./users" 


const appReducer = combineReducers({  
    auth,
    signup,
    description,
    users
})

export default appReducer