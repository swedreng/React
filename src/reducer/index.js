import { combineReducers } from "redux"

import auth from "./auth" 
import signup from "./signup" 
import description from "./description" 
import users from "./users" 
import fileupload from "./fileupload"


const appReducer = combineReducers({  
    auth,
    signup,
    description,
    users,
    fileupload
})

export default appReducer